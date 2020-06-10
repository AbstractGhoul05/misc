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

logger = logging.getLogger(__name__)


@loader.tds
class CompressMod(loader.Module):
    """Compress videos"""  # Translateable due to @loader.tds
    strings = {"mpg_cfg_doc": "Video to compress",
               "name": "ffmpeg support",
               "after_sleep": "We have finished sleeping!",
               "no_file": "<code>Provide a file to upload</code>"}

    def __init__(self):
        self.config = loader.ModuleConfig("VIDEO_URL", "hello", lambda m: self.strings("mpg_cfg_doc", m))

    @loader.unrestricted  # Security setting to change who can use the command (defaults to owner | sudo)
    async def ffmpegcmd(self, message):
        """Compresses video when you type .ffmpeg"""
        logger.debug("We logged something!")
        if message.file:
            msg = message
        else:
            return
        doc = getattr(msg, "media", None)
        doc = message.client.iter_download(doc)
        logger.debug("Begin Compression")
        await utils.answer(message, self.strings("Compressing", message))
        stream = ffmpeg.input(msg.file.name)
        stream = ffmpeg.output(stream, 'out.mp4')
        r = await utils.run_sync(ffmpeg.run, stream)
        logger.debug(r)
        await utils.answer(message, f'{msg.file.name}.mp4')