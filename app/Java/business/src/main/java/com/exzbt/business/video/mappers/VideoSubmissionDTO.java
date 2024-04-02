package com.exzbt.business.video.mappers;

import com.exzbt.transaction.video.impl.VideoSubmission;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class VideoSubmissionDTO {
    private String videoId;
    private String creatorId;
    private String requestId;
    private Date submitted;

    public VideoSubmissionDTO convertDTO(VideoSubmission submission) {
        this.setVideoId(submission.getVideoId());
        this.setRequestId(submission.getRequestId());
        this.setCreatorId(submission.getCreatorId());
        this.setSubmitted(submission.getSubmitted());
        return this;
    }
}

