from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
from transformers import DetrImageProcessor, DetrForObjectDetection
from PIL import Image
import torch
from gtts import gTTS
from playsound import playsound
from threading import Thread
import os
import time
from googletrans import Translator

app = Flask(__name__)
CORS(app)

# Global variables
camera = None
is_streaming = False
last_detection_time = {}  # To track when each object was last announced
translator = Translator()  # Initialize Google Translator

# Load the models
print("Loading models... This may take a few moments.")
processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-50", revision="no_timm")
model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-50", revision="no_timm")
print("Models loaded successfully!")

def translate_text(text):
    try:
        translation = translator.translate(text, dest='hi')
        return translation.text
    except Exception as e:
        print(f"Translation error: {e}")
        return text  # Return original text if translation fails

def play_audio(text):
    try:
        tts = gTTS(f"Yaha hai {text}", lang="hi")
        audio_file = "output.mp3"
        tts.save(audio_file)
        playsound(audio_file)
        os.remove(audio_file)
    except Exception as e:
        print(f"Error in audio playback: {e}")

def generate_frames():
    global camera, is_streaming, last_detection_time
    
    while is_streaming:
        success, frame = camera.read()
        if not success:
            break
        
        try:
            # Convert frame for processing
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image = Image.fromarray(rgb_frame)
            
            # Process image for object detection
            inputs = processor(images=image, return_tensors="pt")
            outputs = model(**inputs)
            
            # Post-process results
            target_sizes = torch.tensor([image.size[::-1]])
            results = processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.9)[0]
            
            current_time = time.time()
            
            # Draw detections
            for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
                if score > 0.9:  # Confidence threshold
                    label_name = model.config.id2label[label.item()]
                    
                    # Translate label to Hindi using Google Translate
                    translated_label = translate_text(label_name)
                    
                    # Audio announcement with cooldown
                    if label_name not in last_detection_time or \
                       (current_time - last_detection_time[label_name]) > 5:  # 5 second cooldown
                        Thread(target=play_audio, args=(translated_label,)).start()
                        last_detection_time[label_name] = current_time
                    
                    # Draw bounding box
                    box = [round(i, 2) for i in box.tolist()]
                    x_min, y_min, x_max, y_max = map(int, box)
                    cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)
                    cv2.putText(frame, translated_label, (x_min, y_min - 10),
                              cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            
            # Convert frame to bytes
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
                   
        except Exception as e:
            print(f"Error processing frame: {e}")
            continue

@app.route('/start')
def start_stream():
    global camera, is_streaming
    
    try:
        if camera is None:
            camera = cv2.VideoCapture(0)
            
        if not camera.isOpened():
            return jsonify({"error": "Could not open camera"}), 500
            
        is_streaming = True
        return jsonify({"status": "Stream started successfully"})
        
    except Exception as e:
        return jsonify({"error": f"Failed to start stream: {str(e)}"}), 500

@app.route('/stop')
def stop_stream():
    global camera, is_streaming
    
    try:
        is_streaming = False
        if camera is not None:
            camera.release()
            camera = None
        return jsonify({"status": "Stream stopped successfully"})
        
    except Exception as e:
        return jsonify({"error": f"Failed to stop stream: {str(e)}"}), 500

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                   mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/status')
def get_status():
    return jsonify({
        "is_streaming": is_streaming,
        "camera_initialized": camera is not None
    })


@app.route('/')
def index():
    return "Enhanced Object Detection API with Hindi Translation is running!"

if __name__ == '__main__':
    try:
        port = int(os.environ.get('PORT', 8000))
        app.run(host='0.0.0.0', port=port, debug=True)
    except Exception as e:
        print(f"Failed to start server: {e}")
    finally:
        if camera is not None:
            camera.release()