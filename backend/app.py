from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Configure MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/chatbotDB"
client = MongoClient(app.config["MONGO_URI"])
db = client.chatbotDB

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    user_message = data['message']

    # Here you would integrate your machine learning model to get the bot's response
    bot_reply = "This is a dummy response"  # Replace with actual model response

    # Save the conversation to the database
    db.messages.insert_one({"user_message": user_message, "bot_reply": bot_reply})

    return jsonify({"reply": bot_reply})

@app.route('/get_messages', methods=['GET'])
def get_messages():
    messages = list(db.messages.find({}, {'_id': 0}))
    return jsonify(messages)

if __name__ == '__main__':
    app.run(debug=True)
