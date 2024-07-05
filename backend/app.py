from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
import datetime
from bson.objectid import ObjectId
from config import Config

app = Flask(__name__)
CORS(app)  # Enable CORS if your frontend is running on a different domain

# Load configuration from config.py
app.config.from_object(Config)

# Initialize PyMongo
mongo = PyMongo(app)
db = mongo.db

# Check if we can connect to the database
try:
    mongo.cx.server_info()  # This will throw an exception if unable to connect
    print("Connected to MongoDB")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")

@app.route('/create_chat', methods=['POST'])
def create_chat():
    data = request.get_json()
    title = data.get('title', 'Untitled Chat')
    start_time = datetime.datetime.utcnow()

    chat = {
        "title": title,
        "conversations": [],
        "timestamp": start_time
    }
    chat_id = db.Chats.insert_one(chat).inserted_id

    return jsonify({"chat_id": str(chat_id)})

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    chat_id = data['chat_id']
    user_message = data['message']
    sender = data['sender']

    # Here you would integrate your machine learning model to get the bot's response
    bot_reply = "This is a dummy response"  # Replace with actual model response

    user_message_data = {
        "sender": sender,
        "message": user_message,
        "timestamp": datetime.datetime.utcnow()
    }
    bot_message_data = {
        "sender": "bot",
        "message": bot_reply,
        "timestamp": datetime.datetime.utcnow()
    }

    conversation = {
        "conversation_id": str(ObjectId()),
        "messages": [user_message_data, bot_message_data]
    }

    db.Chats.update_one(
        {"_id": ObjectId(chat_id)},
        {"$push": {"conversations": conversation}}
    )

    return jsonify({"reply": bot_reply})

@app.route('/get_messages', methods=['GET'])
def get_messages():
    chat_id = request.args.get('chat_id')
    chat = db.Chats.find_one({"_id": ObjectId(chat_id)}, {'_id': 0, 'conversations': 1})
    if chat:
        messages = [message for conversation in chat['conversations'] for message in conversation['messages']]
        return jsonify(messages)
    else:
        return jsonify([]), 404


@app.route('/get_chats', methods=['GET'])
def get_chats():
    chats = db.Chats.find({}, {'title': 1, 'timestamp': 1}).sort('timestamp', -1) # sort by timestamp
    chat_list = [{"_id": str(chat["_id"]), "title": chat["title"]} for chat in chats]
    return jsonify(chat_list)


if __name__ == '__main__':
    app.run(debug=True)
