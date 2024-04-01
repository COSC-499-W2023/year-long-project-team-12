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
    private String creatorId;
    private String videoName;
    private Date created;
    @Getter(AccessLevel.NONE)
    private Boolean saved;
    public Boolean isSaved() {
        return this.saved;
    }

    public Video convertFromDTO() {
        Video video = new Video();
        video.setVideoId(this.getVideoId());
        video.setCreatorId(this.getCreatorId());
        video.setCreated(this.getCreated());
        video.setVideoName(this.getVideoName());
        video.setSaved(this.isSaved());
        return video;
    }
}
