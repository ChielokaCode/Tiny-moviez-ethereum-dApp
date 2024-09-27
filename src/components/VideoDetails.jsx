import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  const [watchProgress, setWatchProgress] = useState(0); // To store the watch time
  const [isVideoComplete, setIsVideoComplete] = useState(false); // Track if video is fully watched

  console.log("Inside Video Details Component...");
  console.log(videos, videoDetail, id);

  // This function is called periodically as the video plays
  const handleProgress = (state) => {
    setWatchProgress(state.played); // Updates watch progress
    if (state.played >= 0.99) {
      // Video is 99% watched
      setIsVideoComplete(true);
    }
  };

  // Handle video end
  const handleEnded = () => {
    setIsVideoComplete(true); // Mark video as fully watched
  };

  useEffect(() => {
    const fetchResults = async () => {
      const videosData = await fetchFromAPI(
        `search?part=snippet&relatedToVideoId=${id}&type=video`
      );
      console.log(`search?part=snippet&relatedToVideoId=${id}&type=video`);
      console.log(videosData);
      setVideos(videosData.items);

      const data = await fetchFromAPI(
        `videos?part=snippet,statistics&id=${id}`
      );
      setVideoDetail(data.items[0]);
    };

    fetchResults();
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              onProgress={handleProgress} // Track progress
              onEnded={handleEnded} // Detect when the video ends
            />
            {/* <div style={{ color: "#fff", margintop: "10px" }}>
              Watch Progress: {(watchProgress * 100).toFixed(2)}%
            </div>
            {isVideoComplete && (
              <div style={{ color: "green", margintop: "10px" }}>
                Video completed!
              </div>
            )} */}
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetails;
