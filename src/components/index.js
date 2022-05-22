
import Button from "./Button.vue";

import FormGroupInput from "./Inputs/formGroupInput.vue";

import DropDown from "./Dropdown.vue";

import Card from "./Cards/Card.vue";
import ChartCard from "./Cards/ChartCard.vue";
import StatsCard from "./Cards/StatsCard.vue";

import SidebarPlugin from "./SidebarPlugin/index";

import PaperTable from "./PaperTable.vue";



let components = {
  FormGroupInput,
  Card,
  ChartCard,
  StatsCard,
  DropDown,
  SidebarPlugin,
  PaperTable
};

export default components;

export {
  FormGroupInput,
  Card,
  ChartCard,
  StatsCard,
  DropDown,
  Button,
  SidebarPlugin,
  PaperTable
};