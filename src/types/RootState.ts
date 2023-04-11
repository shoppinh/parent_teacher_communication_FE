import { ThemeState } from 'styles/theme/slice/types';
import { SessionState } from './Session';
import { DeviceState } from './Device';
import { ConfigState } from './Config';
import { SystemState } from './System';
import { RegisterState } from './Register';
import { ConversationState } from './Conversation';
import { AdminState } from './Admin';
import { PostState } from './Post';
import { ClassState } from './Class';
import { ProgressState } from './Progress';
import { StudentState } from './Student';
import { TeacherState } from './Admin/Teacher';
import { EventState } from './Event';

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life.
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  session?: SessionState;
  config?: ConfigState;
  device?: DeviceState;
  system?: SystemState;
  register?: RegisterState;
  conversation?: ConversationState;
  admin?: AdminState;
  post?: PostState;
  class?: ClassState;
  progress?: ProgressState;
  student?: StudentState;
  teacher?: TeacherState;
  event?: EventState;

  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
