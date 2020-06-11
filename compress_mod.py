#    Friendly Telegram (telegram userbot)
#    Copyright (C) 2018-2019 The Authors

#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.

#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.

#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/>.

import asyncio
import logging
import ffmpeg

from .. import loader, utils
from io import BytesIO

logger = logging.getLogger(__name__)


@loader.tds
class CompressMod(loader.Module):
    """Compress videos"""  # Translateable due to @loader.tds
    strings = {"name": "ffmpeg support",
               "no_file": "<code>Provide a video to compress</code>",
               "compressing": "<code>Compressing...</code>"}

    @loader.unrestricted  # Security setting to change who can use the command (defaults to owner | sudo)
    @loader.ratelimit
    async def ffmpegcmd(self, message):
        """Compresses video when you type .ffmpeg"""
        logger.debug("We logged something!")
        # if message.file:
        #     msg = message
        # else:
        #     msg = (await message.get_reply_message())

        # doc = getattr(msg, "media", None)
        # if doc is None:
        #     await utils.answer(message, self.strings("no_file", message))
        #     return
      
        # doc = message.client.iter_download(doc)
        # logger.debug("Begin Compression")
        # await utils.answer(message, self.strings("compressing", message))
        # stream = ffmpeg.input(msg.file.name)
        # stream = ffmpeg.output(stream, 'out.mp4')
        # r = await utils.run_sync(ffmpeg.run, stream)
        # logger.debug(r)
        # await utils.answer(message, 'out.mp4')
        target = await message.get_reply_message()
        if target is None:
          await utils.answer(message, self.strings("no_file", message))
          return
        try:
            await utils.answer(message, self.strings("compressing", message))
            file = BytesIO()
            await target.download_media(file)
            file.seek(0)
            stream = await utils.run_sync(ffmpeg.input, file.name)
            file.close()
            result = BytesIO()
            result.name = "out.mp4"
            stream = await utils.run_sync(ffmpeg.output, stream, 'out.mp4')
            await utils.run_sync(ffmpeg.run, stream)
            result.seek(0)
            await utils.answer(message, result)
        finally:
            try:
                file.close()
            except UnboundLocalError:
                pass
            try:
                result.close()
            except UnboundLocalError:
                pass
