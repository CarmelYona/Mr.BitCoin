
<template>
  <h1>Statistic Page</h1>
  <section class="statistic-page">
    <div class="charts-container">
      <MarketPriceChart
        v-if="priceHistory"
        :data="getPriceData"
        :labels="getPriceLabels"
        title="Market Price"
      />

      <div class="divider"></div>

      <MarketPriceChart
        v-if="transactionsHistory"
        :data="getTransactionsData"
        :labels="getTransactionsLabels"
        title="Trade Volume"
      />

      <MarketPriceChart
        v-if="avgBlockSize"
        :data="getAvgBlockSizeData"
        :labels="getAvgBlockSizeLabels"
        title="AVG Block Size"
      />
    </div>
    <!-- <button @click="onBack">Back</button> -->
  </section>
</template>

<script>
import { bitcoinService } from "@/services/bitcoin.service.js";
import MarketPriceChart from "@/components/MarketPriceChart.vue";

export default {
  data() {
    return {
      priceHistory: null,
      transactionsHistory: null,
      avgBlockSize: null,
    };
  },

  async created() {
    this.priceHistory = await bitcoinService.getDataFromApi('PRICE_HISTORY_KEY','priceApi');
    this.transactionsHistory = await bitcoinService.getDataFromApi('TRANSACTIONS_HISTORY_KEY','transactionsApi');
    this.avgBlockSize = await bitcoinService.getDataFromApi('AVG_BLOCK_SIZE','avgBlockSIzeApi');
  },

  computed: {
    getPriceLabels() {
      const labels = [];
      this.priceHistory.forEach((pricePoint) => {
        const newDate = new Date(pricePoint.x * 1000);
        const dateToDisplay = new Intl.DateTimeFormat("en-US").format(newDate);
        labels.push(dateToDisplay);
      });
      return labels;
    },
    getPriceData() {
      const priceData = [];
      this.priceHistory.forEach((pricePoint) => priceData.push(pricePoint.y));
      return priceData;
    },
    getTransactionsLabels() {
      const labels = [];
      this.transactionsHistory.forEach((pricePoint) => {
        const newDate = new Date(pricePoint.x * 1000);
        const dateToDisplay = new Intl.DateTimeFormat("en-US").format(newDate);
        labels.push(dateToDisplay);
      });
      return labels;
    },
    getTransactionsData() {
      const priceData = [];
      this.transactionsHistory.forEach((pricePoint) =>
        priceData.push(pricePoint.y)
      );
      return priceData;
    },
    getAvgBlockSizeLabels() {
      const labels = [];
      this.avgBlockSize.forEach((pricePoint) => {
        const newDate = new Date(pricePoint.x * 1000);
        const dateToDisplay = new Intl.DateTimeFormat("en-US").format(newDate);
        labels.push(dateToDisplay);
      });
      return labels;
    },
    getAvgBlockSizeData() {
      const priceData = [];
      this.avgBlockSize.forEach((pricePoint) =>
        priceData.push(pricePoint.y)
      );
      return priceData;
    },
  },

  methods: {
    // onBack() {
    //   this.$router.push("/");
    // },
  },
  components: {
    MarketPriceChart,
  },
};
</script>

<style lang="scss">
.statistic-page {
  width: 100%;
  .charts-container {
    display: flex;
    height: 100%;
    width: 100%;
  }
}
</style>