<template>
  <div>
    <h2>MIB College</h2>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="6"
        order="last"
        order-sm="last"
        order-md="last"
        order-lg="first"
        class="mt-5"
      >
        <v-card>
          <v-card-title>Payment Schedule</v-card-title>
          <v-card-text>Please select payment option(s)</v-card-text>
          <v-simple-table class="px-5 pb-5" dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Date</th>
                  <th class="text-left">Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in arrByConditions" :key="index">
                  <td>{{ item.month }}</td>
                  <td>{{ item.cost ? 'RM ' + item.cost : '' }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="6"
        order="first"
        order-sm="first"
        order-md="first"
        order-lg="last"
        class="mt-5"
      >
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
              <v-card-text>
                <div class="font-weight-bold">More info on PTPTN Website</div>
                <a :href="ptptnUrl">{{ ptptnUrl }}</a>
              </v-card-text>
            </div>
            <v-checkbox
              v-model="optionsSelected"
              label="Flexi Payment Plan"
              value="flexi"
            />
            <v-checkbox
              v-model="optionsSelected"
              label="Don Yong Scholarship"
              value="scholarship"
            />
            <v-checkbox
              v-model="optionsSelected"
              label="Full Payment (5% Discount)"
              value="full"
            />
            <v-checkbox v-model="optionsSelected" label="EPF" value="epf" />
            <div v-if="optionsSelected.includes('epf')">
              <v-card-text>
                <div>
                  You can withdraw from yourr EPF Second Account to pay for you
                  child's fees.
                </div>
                <div class="font-weight-bold">More info on EPF Website</div>
                <a v-bind="epfUrl">​{{ epfUrl }}</a>
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import csvData from '../csvData/csvData.json'

export default {
  data() {
    return {
      optionsSelected: [],
      incomeLvlSelected: 0,
      csvData: csvData,
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
      epfUrl: 'https://www.kwsp.gov.my/member/widthrawals/partial/education',
      ptptnUrl: 'https://www.ptptn.gov.my/msk/MaklumatKursus/C8463/1/2/3/0/0',
    }
  },
  computed: {
    arrByConditions() {
      const os = this.optionsSelected

      if (os.length === 0) return csvData.self_funding_semester || []

      // PTPTN
      if (os.length == 1 && os.includes('ptptn')) {
        // INCOME LEVEL 1
        if (this.incomeLvlSelected === 0) return csvData.ptptnMax || []
        // INCOME LEVEL 2
        if (this.incomeLvlSelected === 1) return csvData.ptptn75 || []
        // INCOME LEVEL 3
        if (this.incomeLvlSelected === 2) return csvData.ptptn50 || []
      }

      // flexi
      if (os.length === 1 && os.includes('flexi'))
        return csvData.self_funding_flexi || []

      // flexi & PTPTN & INCOME LEVEL 1
      if (
        os.length === 2 &&
        os.includes('flexi') &&
        os.includes('ptptn') &&
        this.incomeLvlSelected === 0
      )
        return csvData.flexi_ptptnMax || []

      // flexi & PTPTN & INCOME LEVEL 2
      if (
        os.length === 2 &&
        os.includes('flexi') &&
        os.includes('ptptn') &&
        this.incomeLvlSelected === 1
      )
        return csvData.flexi_ptptn75 || []

      // flexi & PTPTN & INCOME LEVEL 3
      if (
        os.length === 2 &&
        os.includes('flexi') &&
        os.includes('ptptn') &&
        this.incomeLvlSelected === 2
      )
        return csvData.flexi_ptptn50 || []

      // scholarship
      if (os.length === 1 && os.includes('scholarship'))
        return csvData.scholarship_semester || []

      // scholarship & flexi
      if (os.length === 2 && os.includes('scholarship') && os.includes('flexi'))
        return csvData.scholarship_flexi || []

      // scholarship & PTPTN & INCOME LEVEL 1
      if (
        os.length === 2 &&
        os.includes('scholarship') &&
        os.includes('ptptn') &&
        this.incomeLvlSelected === 0
      )
        return csvData.scholarship_ptptnMax_semester || []

      // scholarship & PTPTN & INCOME LEVEL 2
      if (
        os.length === 2 &&
        os.includes('scholarship') &&
        os.includes('ptptn') &&
        this.incomeLvlSelected === 1
      )
        return csvData.scholarship_ptptn75_semester || []

      // scholarship & PTPTN & INCOME LEVEL 3
      if (
        os.length === 2 &&
        os.includes('scholarship') &&
        os.includes('ptptn') &&
        this.incomeLvlSelected === 2
      )
        return csvData.scholarship_ptptn50_semester || []

      // scholarship & PTPTN & INCOME LEVEL 1 & flexi
      if (
        os.length === 3 &&
        os.includes('scholarship') &&
        os.includes('ptptn') &&
        os.includes('flexi') &&
        this.incomeLvlSelected === 0
      )
        return csvData.scholarship_ptptnMax_flexi || []

      // scholarship & PTPTN & INCOME LEVEL 3 & flexi
      if (
        os.length === 3 &&
        os.includes('scholarship') &&
        os.includes('ptptn') &&
        os.includes('flexi') &&
        this.incomeLvlSelected === 1
      )
        return csvData.scholarship_ptptn75_flexi || []

      // scholarship & PTPTN & INCOME LEVEL 3 & flexi
      if (
        os.length === 3 &&
        os.includes('scholarship') &&
        os.includes('ptptn') &&
        os.includes('flexi') &&
        this.incomeLvlSelected === 2
      )
        return csvData.scholarship_ptptn50_flexi || []

      // FULL PAYMENT
      if (os.length === 1 && os.includes('full'))
        return csvData.self_funding_full || []

      // FULL PAYMENT & scholarship
      if (os.length === 2 && os.includes('full') && os.includes('scholarship'))
        return csvData.scholarship_full || []

      return []
    },
  },
}
</script>
