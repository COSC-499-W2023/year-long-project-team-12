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
public class VideoSubmissionRequest {
    private String videoId;
    private String creatorId;
    private String requestId;
    private Date submitted;

    public VideoSubmission convertFromDTO() {
        VideoSubmission videoSubmission = new VideoSubmission();
        videoSubmission.setVideoId(this.getVideoId());
        videoSubmission.setRequestId(this.getRequestId());
        videoSubmission.setCreatorId(this.getCreatorId());
        videoSubmission.setSubmitted(this.getSubmitted());
        return videoSubmission;
    }
}
