<template>
  <n-modal
    :show="true"
  >
    <n-card
      style="width: 1000px"
      title="Task Details"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
    <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="selectedTask"
      :rules="rules"
    >
    <n-row gutter="12">
      <n-col :span="6">
        <n-form-item label="Task Name" path="name">
            <n-input v-model:value="selectedTask.name" placeholder="Input Name" />
         </n-form-item>
      </n-col>
      <n-col :span="6">
        <n-form-item label="Start" path="start_date">
          <n-date-picker
            v-model:formatted-value="selectedTask.start_date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            clearable
          />
      </n-form-item>
      </n-col>
      <n-col :span="6">
        <n-form-item label="End" path="end_date">
          <n-date-picker
            v-model:formatted-value="selectedTask.end_date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            clearable
          />
      </n-form-item>
      </n-col>
      <n-col :span="6">
        <n-form-item label="Priority" path="priority">
        <n-radio-group
          v-model:value="selectedTask.priority"
          name="Priority"
          style="margin-bottom: 12px"
        >
          <n-radio-button value="urgent">
            Urgent
          </n-radio-button>
          <n-radio-button value="essential">
            Essential
          </n-radio-button>
          <n-radio-button value="regular">
            Regular
          </n-radio-button>
        </n-radio-group>
      </n-form-item>
      </n-col>
      <n-col :span="12">
        <n-form-item label="remarks" path="remarks">
        <n-input
          v-model:value="selectedTask.remarks"
          type="textarea"
          placeholder="remarks"
        />
      </n-form-item>
      </n-col>
      <n-col :span="24">
        <n-form-item>
        <n-button type="success" @click="handleValidateClick">
          Submit
        </n-button>
        <n-button type="error" @click="handleDeleteClick" style="margin-left: 10px;">
          Delete
        </n-button>
        <n-button type="tertiary" @click="handleCancelClick" style="margin-left: 10px;">
          Cancel
        </n-button>
      </n-form-item>
      </n-col>
    </n-row>
    </n-form>
    </n-card>
  </n-modal>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMessage } from 'naive-ui'

export default defineComponent({
  emits : ["emitCancel", "submitTask", "deleteTask"],

  setup(props, context) {
    const formRef = ref(null);
    const message = useMessage();
    const handleCancelClick = () => {
      context.emit('emitCancel')
    }

    const handleValidateClick = (e) => {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            context.emit('submitTask', props.selectedTask)
            message.success("Data Updated");
          } else {
            message.error("Invalid, Re-check the data!");
          }
        });
     }

     const handleDeleteClick = () => {
      context.emit('deleteTask')
     }

    return {
      formRef,
      bodyStyle: {
        width: "1000px"
      },
      segmented: {
        content: "soft",
        footer: "soft"
      },
      size: ref("medium"),
      formattedValue: ref("2007-06-30 12:08:55"),
      rules: {
        name: {
          required: true,
          message: "Please input Task name",
          trigger: ["input"]
        }
      },
      handleCancelClick,
      handleValidateClick,
      handleDeleteClick
    };
  },
  props: {
    selectedTask: {
      default: {
        name: " ",
        start_date: "2007-06-30 12:08:55",
        end_date: "2007-06-30 12:08:55",
        priority: "regular",
        remarks: " "
      },
      type: Object
    }
  }
});
</script>