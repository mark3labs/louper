import type { VercelRequest, VercelResponse } from '@vercel/node'
import { IncomingWebhook }  from '@slack/webhook'

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL)

export default async (request: VercelRequest, response: VercelResponse): Promise<VercelResponse> => {
    console.log('Sending to slack...')
    await webhook.send(
        {
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Feedback from - Louper 💎",
                        "emoji": true
                    }
                },
                // {
                //     "type": "section",
                //     "text": {
                //         "type": "mrkdwn",
                //         "text": `*Email*\n${req.body.email}`
                //     }
                // },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Feedback*\n${request.body.feedback}`
                    }
                }
            ]
        }
    )
    return response.send('ok')
}