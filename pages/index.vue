<template>
  <div>
    <h2>MIB College</h2>
    <v-row>
      <v-col cols="6" sm="12" md="6" class="mt-5">
        <v-card>
          <v-card-title>Payment Schedule</v-card-title>
          <v-card-text>Please select payment option(s)</v-card-text>
          <v-simple-table class="px-5 pb-5" dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">2021</th>
                  <th class="text-left">Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableItems" :key="index">
                  <td>{{ item.month }}</td>
                  <td>{{ item.cost }}</td>
                </tr>
                <tr>
                  <td>Aug</td>
                  <td>RM 1293</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="6" sm="12" md="6" class="mt-5">
        <v-card>
          <v-card-title>Payment Options with Financial Aid (BST)</v-card-title>
          <div class="px-5">
            <v-checkbox v-model="optionsSelected" label="PTPTN" value="ptptn" />
            <div v-if="optionsSelected.includes('ptptn')">
              <v-chip-group
                v-model="incomeLvlSelected"
                active-class="green accent-4 white--text"
                column
              >
                <v-chip>Income Level 1</v-chip>
                <v-chip>Income Level 2</v-chip>
                <v-chip>Income Level 3</v-chip>
              </v-chip-group>
              <v-card-text>
                <div :class="{ 'font-weight-bold': incomeLvlSelected === 0 }">
                  Income Level 1: (100% of Full Loan) Recipient of BPR
                </div>
                <div :class="{ 'font-weight-bold': incomeLvlSelected === 1 }">
                  Income Level 2: (75% of Full Loan) Income RM4,001 to RM8,000
                </div>
                <div :class="{ 'font-weight-bold': incomeLvlSelected === 2 }">
                  Income Level 3: (50% of Full Loan) Income RM8,001 and Above
                </div>
              </v-card-text>
            </div>
            <v-checkbox
              v-model="optionsSelected"
              label="Flexi Payment Plant"
              value="fpp"
            />
            <v-checkbox
              v-model="optionsSelected"
              label="Don Yong Scholarship"
              value="dys"
            />
            <v-checkbox
              v-model="optionsSelected"
              label="Full Payment (5% Discount)"
              value="fpd"
            />
            <v-checkbox v-model="optionsSelected" label="EPF" value="epf" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsSelected: [],
      incomeLvlSelected: null,
      tableItems: [
        { month: 'Aug', cost: 9812 },
        { month: 'Sept', cost: 9812 },
        { month: 'Oct', cost: 9812 },
        { month: 'Nov', cost: 9812 },
        { month: 'Dec', cost: 9812 },
        { month: 'Jan', cost: 9812 },
        { month: 'Feb', cost: 9812 },
        { month: 'Mar', cost: 9812 },
        { month: 'Apr', cost: 9812 },
      ],
    }
  },
}
</script>
