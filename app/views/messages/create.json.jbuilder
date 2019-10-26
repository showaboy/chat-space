json.user_id @message.user_id
json.content @message.content
json.image @message.image
json.user_name @message.user.name
json.date @message.created_at.strftime("%Y年%-m月%-d日 %-H時%-M分")