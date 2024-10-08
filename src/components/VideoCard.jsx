import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

// Destructuring the api response
const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  // console.log(videoId, snippet);
  return (
    <Box>
      <Card
        sx={{
          width: { xs: "100%", sm: "358px", md: "320px" },
          boxShadow: "none",
          borderRadius: 2,
          maxWidth: "358px",
        }}
      >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <CardMedia
            component="img"
            image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
            alt={snippet.title}
            sx={{
              width: { xs: "100%", sm: "358px", md: "320px" },
              height: 180,
              maxWidth: "358px",
            }}
            object-fit="cover"
          />
          {/*Optional Chaining - Returns Undifined instead of error  */}
        </Link>
        <CardContent sx={{ backgroundColor: "#1E1E1E", height: "106px" }}>
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
              {`${snippet?.title.slice(0, 57)}...` ||
                `${demoVideoTitle.slice(0, 57)}...`}
            </Typography>
          </Link>
          <Link
            to={
              snippet?.channelId
                ? `/channel/${snippet?.channelId}`
                : demoChannelUrl
            }
          >
            <Typography variant="subtitle2" color="gray">
              {snippet?.channelTitle || demoChannelTitle}
              <CheckCircleIcon
                sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
              />
            </Typography>
          </Link>
          {/* <button
            style={{
              backgroundcolor: "#50a8c0",
              color: "#fff",
              borderradius: "2rem",
              fontsize: "0.5rem",
              paddingleft: "0.75rem",
              paddingright: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <h2>Watch</h2>
          </button> */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VideoCard;
