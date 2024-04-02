package com.exzbt.business.video.mappers;
import com.exzbt.transaction.video.impl.Video;
import jakarta.persistence.Column;
import lombok.*;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class VideoDetailsDTO {
    private String videoId;
    private String creatorId;
    private String videoName;
    private Date created;
    private Boolean saved;

    public VideoDetailsDTO convertDTO(Video video) {
        this.setVideoId(video.getVideoId());
        this.setVideoName(video.getVideoName());
        this.setCreatorId(video.getCreatorId());
        this.setCreated(video.getCreated());
        this.setSaved(video.isSaved());

        return this;
    }
}
