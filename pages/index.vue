<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <b-field label="Course">
            <b-select
              placeholder="Select a course"
              expanded
              v-model="selectedCourse"
              :loading="isLoading"
            >
              <option
                v-for="option in courses"
                :value="option.id"
                :key="option.id"
              >
                {{ option.name }}
              </option>
            </b-select>
          </b-field>
          <b-field label="R-nummer">
            <b-input v-model="studentNumber"></b-input>
          </b-field>

          <b-button @click="login">Inloggen</b-button>
        </div>       
      </div>
      <div class="columns">
         <div class="column">
          <b-table :data="submissionArray" sortable striped :loading="isLoading">
            <b-table-column field="name" label="Name" sortable v-slot="props">
              {{ props.row.name }}
            </b-table-column>
            <b-table-column
              field="submitted"
              label="Submitted"
              sortable
              v-slot="props"
            >
              <b-icon icon="check" v-if="props.row.submitted" />
            </b-table-column>
            <b-table-column
              field="grade"
              label="Grade"
              v-slot="props"
            >
              {{props.row.grade ? props.row.grade : ''}}
            </b-table-column>
          </b-table>
        </div>
        <div class="column">
          <b-table :data="percentageArray" sortable striped :loading="isLoading">
            <b-table-column field="chapter" label="Chapter" sortable v-slot="props">
              {{props.row.chapter}}
            </b-table-column>
            <b-table-column label="Score" sortable v-slot="props">
              {{props.row.score}}/{{props.row.max}}
            </b-table-column>
            <template #footer >
              <th>Total:</th>
              <th colspan="2">{{totalPercentage}}</th>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { SubmissionDto } from "~/dto/submission";
import { globalModule } from "~/store";

function sliceIntoChunks(arr: Array<SubmissionDto>, chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

@Component({
  name: "Dashboard",
  head: {
    title: "Home",
  },
})
export default class Index extends Vue {
  studentNumber = "";
  selectedCourse = 0;
  columns = [
    { field: "name", label: "Name" },
    { field: "submitted", label: "Submitted" },
  ];

  async login() {
    await globalModule.getSubmissions({
      x: this.studentNumber,
      y: this.selectedCourse,
    });
  }

  async asyncData() {
    await globalModule.getCourses();
  }

  get submissionArray() {
    return globalModule.submissions.submissions;
  }

  get percentageArray(){
    return globalModule.submissions.percentages;
  }

  get totalPercentage(){
    const maxTotal = globalModule.submissions.percentages.map(x => {return x.max}).reduce((a, b) => a + b, 0);
    const scoreTotal = globalModule.submissions.percentages.map(x => {return x.score}).reduce((a, b) => a + b, 0);
    return Math.round((scoreTotal / maxTotal) * 100) +"%";
  }

  get isLoading(){
    return globalModule.loading;
  }

  get courses() {
    return globalModule.courses;
  }
}
</script>
