import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  const [pointBalance, setPointBalance] = useState(0);
  const [watchProgress, setWatchProgress] = useState(0); // Track progress

  const previousTimeRef = useRef(0); // To track the previous watched time
  const playerRef = useRef(null);

  console.log("Inside Video Details Component...");
  console.log(videos, videoDetail, id);

  // This function is called periodically as the video plays
  const handleProgress = (state) => {
    const currentTime = state.playedSeconds;
    const timeDifference = currentTime - previousTimeRef.current;

    // Update previous time
    previousTimeRef.current = currentTime;

    // If the user skips (i.e., the time jump is larger than expected, e.g., 5 seconds), reload the page
    if (timeDifference > 5) {
      toast("Skip detected, Reseting video progress ");

      // Reset the player to start from the beginning
      setWatchProgress(0);
      playerRef.current.seekTo(0); // Resets the video to the beginning
    }

    setWatchProgress(state.played); // Update watch progress

    if (parseFloat((state.played * 100).toFixed(2)) >= 99.85) {
      toast("Video completely watched!");
      setPointBalance(5);
      localStorage.setItem("PointBalance", 5);
    }
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
              ref={playerRef}
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              onProgress={handleProgress} // Track progress
              // onEnded={handleEnded} // Detect when the video ends
            />
            <div style={{ color: "#fff", margintop: "10px" }}>
              Watch Progress: {(watchProgress * 100).toFixed(2)}%
            </div>
            <ToastContainer />
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
