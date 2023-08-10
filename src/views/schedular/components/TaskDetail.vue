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
        <n-button type="success" @click="handleValidateClick">
          Submit
        </n-button>
        <n-button type="error" @click="handleDeleteClick" style="margin-left: 10px;" v-if="task.id">
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
import { defineComponent, ref, toRef } from "vue";
import { useMessage } from 'naive-ui'

export default defineComponent({
  emits : ["emitCancel", "submitTask", "deleteTask", "updateTask"],

  setup(props, context) {
    const formRef = ref(null);
    const message = useMessage();
    const handleCancelClick = () => {
      context.emit('emitCancel')
    }
    const task = toRef(props, 'selectedTask')

    const handleValidateClick = (e) => {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          console.log(task.value)
          if (!errors) {
            if (task.value.id) {
              console.log('--------------update----------------')
              console.log(task.value)
              context.emit('updateTask', task.value)
              message.success("Data Updated");
            } else {
              console.log('--------------create----------------')
              console.log(task.value)
              context.emit('submitTask', task.value)
              message.success("Data Created");
            }
          } else {
            message.error("Invalid, Re-check the data!");
          }
        });
     }

     const handleDeleteClick = () => {
      context.emit('deleteTask', task.value.id)
     }

    return {
      formRef,
      task,
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
            message: "Please input your name",
            trigger: "blur"
          },
      },
      handleCancelClick,
      handleValidateClick,
      handleDeleteClick
    };
  },
  props: {
    selectedTask: {
      default: {
        name: "",
        start_date: "2007-06-30 12:08:55",
        end_date: "2007-06-30 12:08:55",
        priority: "regular",
        remarks: ""
      },
      type: Object
    }
  }
});
</script>