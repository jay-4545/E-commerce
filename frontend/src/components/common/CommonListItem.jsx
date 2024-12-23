import { Delete, Edit } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function CommonListItem({
  item,
  link,
  handleDelete,
  fields,
  renderSubtitle,
  renderImage,
}) {
  return (
    <div>
      <li className="flex items-center gap-4 py-4">
        <Avatar
          alt={item[fields.title]}
          src={renderImage ? renderImage(item) : item[fields.image]}
          sx={{
            height: { xs: "2rem", md: "3rem" },
            width: { xs: "2rem", md: "3rem" },
          }}
        />
        <div className="flex-grow-[1]">
          <Typography>{item[fields.title]}</Typography>
          {(renderSubtitle || fields.subTitle) && (
            <Typography color="textSecondary" className="line-clamp-1">
              {renderSubtitle ? renderSubtitle(item) : item[fields.subTitle]}
            </Typography>
          )}
        </div>
        <div className="shrink-0">
          <IconButton LinkComponent={Link} to={link} color="secondary">
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDelete(item._id);
            }}
            color="error"
          >
            <Delete />
          </IconButton>
        </div>
      </li>
    </div>
  );
}

export default CommonListItem;
