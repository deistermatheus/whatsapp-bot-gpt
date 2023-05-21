# WIP

## DISCLAIMERS

This client is not officially supported or affiliated to Whatsapp/Meta in any way. Your number might be banned by using
this kind of bot. It is highly recommended that you use a spare SIM card and not rely on this on a production app. Groups
are not supported by official Whatsapp APIs.

## SUMMARY

This project is a proof of concept on how one would connect an **unnoficial** Whatsapp client to add GPT functionality
to show off on a group with your friends and family :) First features are recipe suggestion by GPT prompt and audio transcription
by Whisper.

## HOW DO I RUN THIS DEMO ?

See `.env.example` for required environment variables. For now, it needs a MongoDB Url and your own Open AI API KEY. The http server
is only for webhooks and future features. Audio transcription may require that you have ffmpeg installed on your host environment (Docker / Linux)

## TODOS:

- [ ] Decouple Neural Network training from js build
- [ ] Build Dockerfile with FFMPEG OS-level dependencies
- [ ] Fix MongoDB Remote Store or map to a persistent disk on prod env
- [ ] Build script to host on cloud provider
- [ ] Improve NLP based routing
- [ ] Refactor to TypeScript

## DEMO:

** add gif here **
