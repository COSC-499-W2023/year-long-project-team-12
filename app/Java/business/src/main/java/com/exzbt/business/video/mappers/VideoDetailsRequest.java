package com.exzbt.business.video.mappers;

import com.exzbt.transaction.video.impl.Video;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class VideoDetailsRequest {
    private String videoId;
    private String requestId;
    private String creatorId;
    private Date created;

    public Video convertFromDTO() {
        Video video = new Video();
        video.setVideoId(this.getVideoId());
        video.setCreatorId(this.getCreatorId());
        video.setCreated(this.getCreated());
        video.setRequestId(this.getRequestId());
        return video;
    }
}
