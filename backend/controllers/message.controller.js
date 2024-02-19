    import Conversation from "../models/conversation.model.js";
    import Message from "../models/message.model.js";

    export const sendMessage = async (req, res) => {
        try {
            const { message: messageContent } = req.body;
            const { id: receiverId } = req.params;
            const senderId = req.user._id;
    
            // First, check if the conversation exists
            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            });
    
            // If conversation doesn't exist, create a new one
            if (!conversation) {
                conversation = new Conversation({
                    participants: [senderId, receiverId],
                });
                await conversation.save();
            }
    
            // Create the new message
            const newMessage = new Message({
                senderId,
                receiverId,
                message: messageContent,
            });
            await newMessage.save();
    
            // Add the message to the conversation and save it
            conversation.messages.push(newMessage._id);
            await conversation.save();
    
            return res.status(201).json(newMessage);
        } catch (error) {
            console.log("Error in sending the message ", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    
    export const getMessages = async (req,res)=>{
        try {
            const {id:userToChatId} = req.params;
            const senderId = req.user._id;

            const conversation= await Conversation.findOne({
                participants:{$all:[senderId,userToChatId]},
            }).populate("messages");

            if(!conversation) return res.status(200).json([]);
            const messages = conversation.messages;
            res.status(200).json(messages);
        } catch (error) {
            console.log("Error in sending the message ", error.message);
            res.status(500).json({ error: "Internal Server Error" }); 
        }
    }