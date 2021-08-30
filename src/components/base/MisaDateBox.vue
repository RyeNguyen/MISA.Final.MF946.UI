<template>
  <div
      :style="{width: dateboxWidth}"
      class="misa-datebox"
  >
    <div class="misa-datebox__label">
      <label :for="dateboxId">
        {{ labelName }}
      </label>
    </div>
    <DxDateBox
        :show-clear-button="true"
        :use-mask-behavior="true"
        :value="dateValue"
        type="date"
        :max="currentDate"
    >
      <DxCalendarOptions min-zoom-level="decade"></DxCalendarOptions>
    </DxDateBox>
  </div>
</template>

<script>
import { DxDateBox, DxCalendarOptions } from 'devextreme-vue/date-box';

import { locale } from 'devextreme/localization';

export default {
  name: "MisaDateBox",

  created() {
    locale("vi-VN");
  },

  data() {
    return {
      currentDate: Date(),

      locale: null,
    }
  },

  components: {
    DxDateBox,
    DxCalendarOptions
  },

  props: {
    dateboxId: {
      type: String,
      required: true
    },

    labelName: {
      type: String
    },

    dateboxWidth: {
      type: String
    },

    dateValue: {

    }
  }
}
</script>

<style lang="scss">
.misa-datebox {
  &__label {
    height: 20px;
    font-family: 'NotoSans-Semibold', sans-serif;
  }

  & .dx-texteditor.dx-editor-outlined {
    height: 32px;
    border-radius: 2px;
    border: 1px solid var(--color-hightlight);

    &:hover {
      outline: 1px solid var(--color-hightlight-hover);
    }

    input {
      &:focus {
        border-color: var(--color-primary) !important;
      }
    }
  }

  .dx-texteditor-container:focus {
    border-color: var(--color-primary) !important;
  }
}

.dx-calendar-cell {
  color: var(--color-text-content);
}

.dx-calendar-cell.dx-calendar-other-view:not(.dx-calendar-selected-date) {
  color: var(--text-disable-color);
}

.dx-calendar-body thead tr th {
  color: var(--text-disable-color);
}

.dx-datebox-wrapper-time .dx-list-item-content {
  padding: 10px !important;
}

.dx-datebox-wrapper-calendar .dx-calendar {
  margin: 10px 0 !important;
}

.dx-datebox-wrapper-time .dx-state-hover .dx-list-item-content {
  background: var(--date-picker-hover-bg);
}

.dx-calendar-caption-button {
  .dx-button-text {
    text-transform: capitalize;
  }
}

// In màu cho ngày cuối tuần và ngày hiện tại
.dx-calendar-cell:not(.dx-calendar-other-month) .weekend {
  text-shadow: none;
  font-weight: bold;
}

.dx-calendar-cell:not(.dx-calendar-other-month) .weekend {
  color: #ff3030;
}

.dx-state-disabled.dx-calendar,
.dx-calendar-cell:not(.dx-calendar-other-month),
.weekend {
  color: #ff8080;
}

.ms-datebox.disabled {
  .datebox-input {
    //background-color: $input-disable-bg-color;
    //border-color: $input-disable-border;
    //cursor: auto;
    //pointer-events: none;
    //input {
    //  color: $input-disable-color !important;
    //}
  }
}

.ms-datebox {
  height: max-content;
  width: 100%;

  .dx-texteditor.dx-state-focused.dx-editor-outlined {
    border-color: var(--input-hover-border-color);
  }

  .dx-texteditor.dx-editor-outlined {
    border-radius: 4px;
    &:hover {
      border-color: var(--input-hover-border-color);
    }
  }
}

// Style input khi validate error
.is-valid-datebox {
  .dx-dropdowneditor-icon {
    display: none;
  }
  .dx-texteditor.dx-state-focused.dx-editor-outlined {
    border-color: var(--input-error-border-color);
  }
  .dx-texteditor.dx-editor-outlined {
    border-radius: 4px;
    border-color: var(--input-error-border-color);
    &:hover {
      border-color: var(--input-error-border-color);
    }
  }
}

// Style màu cho calendar
.dx-calendar-navigator,
.dx-calendar-caption-button.dx-button,
.dx-button-content {
  color: var(--color-primary) !important;
}

.dx-calendar-navigator-previous-month.dx-button .dx-icon,
.dx-calendar-navigator-previous-view.dx-button .dx-icon,
.dx-calendar-navigator-next-month.dx-button .dx-icon,
.dx-calendar-navigator-next-view.dx-button .dx-icon {
  color: var(--color-primary) !important;
}

.dx-calendar-cell.dx-calendar-selected-date.dx-calendar-contoured-date {
  box-shadow: inset 0 0 0 1px var(--date-picker-active-bg),
  inset 0 0 0 1000px var(--date-picker-active-bg) !important;
}

.dx-calendar-cell.dx-calendar-selected-date {
  box-shadow: inset 0 0 0 1px var(--date-picker-active-bg),
  inset 0 0 0 1000px var(--date-picker-active-bg) !important;
}

.dx-calendar-cell.dx-state-hover {
  box-shadow: inset 0 0 0 1px var(--date-picker-hover-bg),
  inset 0 0 0 1000px var(--date-picker-hover-bg) !important;
}

.dx-calendar-cell.dx-calendar-today {
  color: var(--date-picker-color-today);
}

// Style calendar datetime
@media screen and (max-height: 800px) {
  .dx-datebox-wrapper-datetime {
    .dx-popup-content {
      height: auto !important;
      padding: 16px !important;
      margin: 0 !important;

      .dx-timeview-clock{
        min-height: 150px;
        min-width: 150px;
        background-size: 150px;
      }

      .dx-box-flex {
        align-items: center !important;
        .dx-calendar-body {
          height: 175px !important;
          max-height: 175px !important;
          overflow-y: auto;
        }
      }

      .dx-calendar-view-month {
        margin: 0 !important;
        margin-right: 8px !important;
        height: 235px !important;
        min-height: 235px !important;
      }

      .dx-timeview {
        margin: 0 !important;
        margin-left: 8px !important;
      }
    }

    .dx-popup-bottom.dx-toolbar {
      padding: 0 16px 16px;
    }
  }
}

.dx-datebox-wrapper-datetime {
  .dx-popup-content {
    height: auto !important;
    padding: 16px !important;
    margin: 0 !important;

    .dx-box-flex {
      align-items: center !important;
    }

    .dx-calendar-view-month {
      margin: 0 !important;
      margin-right: 8px !important;
    }

    .dx-timeview {
      margin: 0 !important;
      margin-left: 8px !important;
    }
  }

  .dx-popup-bottom.dx-toolbar {
    padding: 0 16px 16px;
  }

  .dx-toolbar-items-container {
    .dx-toolbar-after {
      display: flex;
      flex-direction: row-reverse;

      .dx-toolbar-button {
        &:first-child {
          padding: 0;
        }
        &:last-child {
          padding-right: 8px;
        }
      }
    }
  }
}
// Style list time
.dx-datebox-wrapper-time{
  .dx-popup-content{
    padding: 0 !important;
  }
}
.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item.dx-list-item-selected{
  background: var(--date-picker-hover-bg) !important;
}
.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item.dx-state-active{
  background: var(--date-picker-hover-bg) !important;
  color: #212121;
}
</style>