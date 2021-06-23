<template>
  <div>
    <v-row class="bg">
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
        <v-img
          lazy-src="mib-logo.jpg"
          max-width="100"
          max-height="72"
          src="mib-logo.jpg"
        ></v-img>
        <h2>Diploma in Baking Science & Technology (BST)</h2>
      </v-col>
    </v-row>

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
                  <td>{{ itemCostString(item.cost) }}</td>
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
          <v-card-title class="pb-0"
            >Payment Options with Financial Assistance</v-card-title
          >
          <v-card-text class="pb-0"
            ><div>
              Select the Financial Assistance options available to find out your
              Payment Schedule!
            </div>
            <div>
              *the amount shown is an estimation, and may vary slightly.
            </div>
          </v-card-text>
          <div class="px-5">
            <v-checkbox v-model="optionsSelected" label="PTPTN" value="ptptn" />

            <div v-if="optionsSelected.includes('ptptn')">
              <v-card-text class="pa-0">
                The amount of loan approved is subject to PTPTN. Household
                income is the main factor to determine how much PTPTN loan you
                are entitled to. Please select your household income below!
              </v-card-text>
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
                <a target="_blank" :href="ptptnUrl">{{ ptptnUrl }}</a>
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
            <div v-if="optionsSelected.includes('scholarship')">
              <v-card-text class="py-0">
                <div>
                  Application requirement: Minimum of 3A’s in SPM/IGCSE Apply
                  here!
                </div>
                <a target="_blank" :href="donYongScholarshipUrl">{{
                  donYongScholarshipUrl
                }}</a>
              </v-card-text>
            </div>
            <v-checkbox
              v-model="optionsSelected"
              label="Full Payment (5% Discount)"
              value="full"
            />
            <v-checkbox v-model="epfOptionSelected" label="EPF" value="epf" />
            <div v-if="epfOptionSelected.includes('epf')">
              <v-card-text>
                <div
                  style="text-decoration: underline; text-decoration-color: red"
                >
                  Parents may withdraw from EPF Account 2 to pay for your
                  child’s fees. We will assist you in the application process.
                </div>
                <div class="font-weight-bold">More info on EPF Website</div>
                <a target="_blank" v-bind="epfUrl">​{{ epfUrl }}</a>
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import csvData from '../mqaCsvData/csvData.json'

export default {
  data() {
    return {
      epfOptionSelected: [],
      optionsSelected: [],
      incomeLvlSelected: 0,
      csvData: csvData,
      epfUrl: 'https://www.kwsp.gov.my/member/widthrawals/partial/education',
      ptptnUrl: 'https://www.ptptn.gov.my/msk/MaklumatKursus/C8463/1/2/3/0/0',
      donYongScholarshipUrl: 'https://forms.gle/DDBa3EvePRLo2Ue66',
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
  methods: {
    itemCostString(cost) {
      if (!cost) return ''
      if (!isNaN(cost)) {
        return 'RM ' + cost
      } else {
        return cost
      }
    },
  },
}
</script>

<style scoped>
.bg {
  background-color: white;
}
</style>
