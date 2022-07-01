import { Component, Input } from '@angular/core';
import {
  FeedbackQuestionType,
  FeedbackSession,
  FeedbackSessionPublishStatus,
  FeedbackSessionSubmissionStatus,
  ResponseVisibleSetting,
  SessionVisibleSetting,
} from '../../../types/api-output';
import { FeedbackVisibilityType, Intent } from '../../../types/api-request';
import { QuestionOutputModel } from '../../pages-session/session-result-page/session-result-page.component';

/**
 * Displaying the question response panel.
 */
@Component({
  selector: 'tm-question-response-panel',
  templateUrl: './question-response-panel.component.html',
  styleUrls: ['./question-response-panel.component.scss'],
})
export class QuestionResponsePanelComponent {

  readonly RESPONSE_HIDDEN_QUESTIONS: FeedbackQuestionType[] = [
    FeedbackQuestionType.CONTRIB,
  ];

  @Input()
  questions: QuestionOutputModel[] = [];

  @Input()
  session: FeedbackSession = {
    courseId: '',
    timeZone: '',
    feedbackSessionName: '',
    instructions: '',
    submissionStartTimestamp: 0,
    submissionEndTimestamp: 0,
    gracePeriod: 0,
    sessionVisibleSetting: SessionVisibleSetting.AT_OPEN,
    responseVisibleSetting: ResponseVisibleSetting.AT_VISIBLE,
    submissionStatus: FeedbackSessionSubmissionStatus.OPEN,
    publishStatus: FeedbackSessionPublishStatus.NOT_PUBLISHED,
    isClosingEmailEnabled: true,
    isPublishedEmailEnabled: true,
    createdAtTimestamp: 0,
    studentDeadlines: {},
    instructorDeadlines: {},
  };

  @Input()
  intent: Intent = Intent.STUDENT_RESULT;

  canUserSeeResponses(question: QuestionOutputModel): boolean {
    const showResponsesTo: FeedbackVisibilityType[] = question.questionOutput.feedbackQuestion.showResponsesTo;

    if (this.intent === Intent.STUDENT_RESULT) {
      return showResponsesTo.filter((visibilityType: FeedbackVisibilityType) =>
          visibilityType !== FeedbackVisibilityType.INSTRUCTORS).length > 0;
    }
    if (this.intent === Intent.INSTRUCTOR_RESULT) {
      return showResponsesTo.filter((visibilityType: FeedbackVisibilityType) =>
          visibilityType === FeedbackVisibilityType.INSTRUCTORS).length > 0;
    }
    return false;
  }

  setLoading(questionOutputModel: QuestionOutputModel): void {
      questionOutputModel.isLoading = true;
      console.log("test");
  }
}
