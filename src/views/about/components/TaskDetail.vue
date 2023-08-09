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
      :model="task"
      :rules="rules"
      :size="size"
    >
    <n-row gutter="12">
      <n-col :span="6">
        <n-form-item label="Task Name" path="name">
            <n-input v-model:value="task.name" placeholder="Input Name" />
         </n-form-item>
      </n-col>
      <n-col :span="6">
        <n-form-item label="Start" path="start_date">
          <n-date-picker
            v-model:formatted-value="task.start_date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            clearable
          />
      </n-form-item>
      </n-col>
      <n-col :span="6">
        <n-form-item label="End" path="end_date">
          <n-date-picker
            v-model:formatted-value="task.end_date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            clearable
          />
      </n-form-item>
      </n-col>
      <n-col :span="6">
        <n-form-item label="Priority" path="priority">
        <n-radio-group
          v-model:value="task.priority"
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
          v-model:value="task.remarks"
          type="textarea"
          placeholder="remarks"
        />
      </n-form-item>
      </n-col>
      <n-col :span="24">
        <n-form-item>
        <n-button @click="handleValidateClick">
          Submit
        </n-button>
        <n-button @click="handleCancelClick" style="margin-left: 10px;">
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
import { useMessage } from "naive-ui";

export default defineComponent({
  emits : ["emitCancel"],

  setup(props, context) {
    const task = ref({
        name: "",
        start_date: "2007-06-30 12:08:55",
        end_date: "2007-06-30 12:08:55",
        priority: "regular",
        remarks: ""
      });
    const message = useMessage();
    const handleCancelClick = () => {
      context.emit('emitCancel')
    }

    const handleValidateClick = (e) => {
      console.log(task.value)
        e.preventDefault();
        task.value?.validate((errors) => {
          if (!errors) {
            message.success("Valid");
          } else {
            console.log(errors);
            message.error("Invalid");
          }
        });
     }

    return {
      bodyStyle: {
        width: "1000px"
      },
      segmented: {
        content: "soft",
        footer: "soft"
      },
      size: ref("medium"),
      formattedValue: ref("2007-06-30 12:08:55"),
      task,
      rules: {
        name: {
          required: true,
          message: "Please input Task name",
          trigger: ["input"]
        }
      },
      handleCancelClick,
      handleValidateClick
    };
  }
});
</script>