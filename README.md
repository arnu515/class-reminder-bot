# Class Reminder bot

Reminds when you have a class from the timings in `timings.json`

### Quickstart

-   Using docker

```bash
# Clone this repo
git clone https://github.com/arnu515/class-reminder-bot.git

# Run dockerfile
docker run -d \
    -e TOKEN=YOUR_DISCORD_BOT_TOKEN
    -e START_CHANNEL_ID=id_of_the_channel_to_send_class_starting_reminders
    -e END_CHANNEL_ID=same_thing_but_for_end_channel_reminders
    "$(docker build . -q)"
```
