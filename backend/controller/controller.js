import youtubeDl from "youtube-dl-exec";
import axios from "axios";

export const getVideoInfo = async (req, res) => {
   const { url } = req.body;
   try {
      const metadata = await youtubeDl(url, {
         dumpSingleJson: true,
         noCheckCertificates: true,
         noWarnings: true,
         preferFreeFormats: true,
      });

      const videoInfo = {
         title: metadata.title,
         thumbnail: metadata.thumbnail,
         duration: metadata.duration,
         formats: metadata.formats.map((format) => ({
            format_id: format.id,
            ext: format.ext,
            resolution: format.resolution,
            url: format.url,
         })),
      };

      res.status(200).json({message: "success", data: videoInfo});
   } catch (error) {
      console.error("Error saat mengambil info video", Error);
      res.status(500).json({ error });
   }
}

export const downloadVideo = async (req, res) => {
	const { url, title } = req.query;
	if (!url) {
		return res.status(400).json({ error: "URL download wajib diisi!" });
	}

	try {
		const safeTitle = (title || "video")
			.replace(/[^a-z0-9]/gi, "_")
			.toLowerCase();
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${safeTitle}.mp4"`
		);
		res.setHeader("Content-Type", "video/mp4");

      const response = await axios({
         method: "get",
         url: decodeURIComponent(url),
         responseType: 'stream'
      })

      response.data.pipe(res)
	} catch (error) {
      console.error('Error saat proxy download', error)
      res.status(500).json({
         success: false,
         message: "internal server error"
      })
   }
}