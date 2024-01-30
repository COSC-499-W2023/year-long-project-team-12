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
    private String requestId;
    private String creatorId;
    private Date created;

    public VideoDetailsDTO convertDTO(Video video) {
        this.setVideoId(video.getVideoId());
        this.setRequestId(video.getVideoId());
        this.setCreatorId(video.getCreatorId());
        this.setCreated(video.getCreated());

        return this;
    }
}
