import axios from "axios"

const sendFeedback = async (feedback: string) => {
    await axios.post('/api/feedback', {
        feedback: feedback
    })
}

export default sendFeedback