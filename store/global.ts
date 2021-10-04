import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { SubmissionDto } from '~/dto/submission';
import { $axios } from '~/utils/api';

export const namespaced = true;

@Module({ name: 'global', stateFactory: true, namespaced: true })
export default class GlobalModule extends VuexModule {
  error: string | null = ''
  success: string | null = ''
  loading: boolean = false
  submissions: Array<SubmissionDto> = []
  courses: Array<any> = []

  @Mutation
  setError(value: string | null = 'An unknown error occured'): void {
    this.loading = false;
    this.error = value;
  }

  @Mutation
  setSuccess(value: string | null) {
    this.success = value;
    this.loading = false;
  }

  @Mutation
  setLoading(value: boolean): void {
    this.loading = value;
  }

  @Mutation
  setSubmissions(value: Array<SubmissionDto>): void {
    this.submissions = value;
  }

  @Mutation
  setCourses(value: Array<SubmissionDto>): void {
    this.courses = value;
  }

  @Action({ rawError: true })
  async getSubmissions(obj: {x: string, y: number}): Promise<void> {
    const {x, y} = obj;
    
    try {          
      this.setLoading(true);
      let {data} = await $axios.get(`/submissions?studentNumber=${x}&courseId=${y}`);
      console.log("Data:", data);
      this.setSubmissions(data);
      this.setLoading(false);
    } catch (error) {
      this.setError();
    }
  }

  @Action({ rawError: true })
  async getCourses(): Promise<void> {
    try {          
      this.setLoading(true);
      let {data} = await $axios.get(`/course`);
      console.log("Data:", data);
      
      this.setCourses(data);
      this.setLoading(false);
    } catch (error) {
      this.setError();
    }
  }
}
