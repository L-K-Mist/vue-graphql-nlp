<template>
  <div>
    <h4 v-if="loading">Loading...</h4>
    <link-item
      v-for="link in allLinks"
      :key="link.id"
      :link="link">
    </link-item>
    <new-supplier></new-supplier>
    <suppliers-table v-if="showSuppliers"></suppliers-table>
  </div>
</template>

<script>
import { ALL_LINKS_QUERY } from "../constants/graphql";
import LinkItem from "./LinkItem";
import NewSupplier from "@/components/Suppliers/NewSupplier"
import SuppliersTable from "@/components/Suppliers/SuppliersTable"

export default {
  name: "LinkList",
  data() {
    return {
      // 3
      showSuppliers: true,
      allLinks: [],
      loading: 0
    };
  },
  components: {
    LinkItem,
    NewSupplier,
    SuppliersTable
  },
  // 4
  apollo: {
    allLinks: {
      query: ALL_LINKS_QUERY
    }
  }
};
</script>