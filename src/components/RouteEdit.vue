<template>
  <v-data-table :headers="headers" :items="value">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Routing Table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on">
              New Route
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.dst"
                      :disabled="editedItem.default"
                      label="Dest"
                    ></v-text-field>
                    <v-checkbox label="Default" v-model="editedItem.default" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="editedItem.dev"
                      :items="ifAliasList"
                      item-text="name"
                      item-value="if"
                      label="Device"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.metrics"
                      type="number"
                      label="Metrics"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title
              >Are you sure you want to delete this route?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.dst="{ item }">
      {{ item.dst ? item.dst : "Default" }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No data.
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ["value"],
  data: () => ({
    ifAliasList: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Dest",
        value: "dst",
      },
      {
        text: "Device",
        value: "devname",
      },
      { text: "Metrics", value: "metrics" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      dst: null,
      metrics: 0,
      dev: "",
    },
    defaultItem: {
      dst: null,
      metrics: 0,
      dev: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Route" : "Edit Route";
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.value.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if (this.editedItem.dst == null) this.editedItem.default = true;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.value.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.value.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      var devname = this.ifAliasList.find((el) => el.if == this.editedItem.dev);
      if (!devname) this.editedItem.devname = this.editedItem.dev;
      else this.editedItem.devname = devname.name;
      if (this.editedIndex > -1) {
        Object.assign(this.value[this.editedIndex], this.editedItem);
      } else {
        this.value.push(this.editedItem);
      }
      this.close();
    },
  },
  mounted() {
    fetch("http://172.20.168.131:13380/if")
      .then((response) => response.json())
      .then((data) => {
        if (data.error == false) {
          this.ifAliasList = data.IFList;
        }
      });
  },
};
</script>

<style></style>
