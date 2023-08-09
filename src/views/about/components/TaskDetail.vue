<template>
  <n-modal
    :show="true"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="Task Details"
    :bordered="false"
    size="huge"
  >
    <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="formValue"
      :rules="rules"
      :size="size"
    >
    <n-row gutter="12">
      <n-col :span="6">
        <n-form-item label="Task Name" path="user.name">
            <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
         </n-form-item>
      </n-col>
      <n-col :span="6">
        <n-form-item label="Start" path="start_date">
          <n-date-picker
            v-model:formatted-value="formattedValue"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            clearable
          />
      </n-form-item>
      </n-col>
      <n-col :span="6">
        <n-form-item label="End" path="user.end_date">
          <n-date-picker
            v-model:formatted-value="formattedValue"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            clearable
          />
      </n-form-item>
      </n-col>
      <n-col :span="6">
        <n-form-item label="Priority" path="user.priority">
        <n-radio-group
          v-model:value="formValue.priority"
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
        <n-form-item label="Comment" path="comment">
        <n-input
          v-model:value="formValue.comment"
          type="textarea"
          placeholder="comment"
        />
      </n-form-item>
      </n-col>
      <n-col :span="24">
        <n-form-item>
        <n-button @click="handleValidateClick">
          Validate
        </n-button>
        <n-button @click="handleCancelClick" style="margin-left: 10px;">
          Cancel
        </n-button>
      </n-form-item>
      </n-col>
    </n-row>
    </n-form>
  </n-modal>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const message = useMessage();

    return {
      bodyStyle: {
        width: "1000px"
      },
      segmented: {
        content: "soft",
        footer: "soft"
      },
      formRef,
      size: ref("medium"),
      formattedValue: ref("2007-06-30 12:08:55"),
      formValue: ref({
        user: {
          name: "",
          age: ""
        },
        phone: ""
      }),
      rules: {
        user: {
          name: {
            required: true,
            message: "Please input your name",
            trigger: "blur"
          },
          age: {
            required: true,
            message: "Please input your age",
            trigger: ["input", "blur"]
          }
        },
        phone: {
          required: true,
          message: "Please input your number",
          trigger: ["input"]
        }
      },
      handleValidateClick(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success("Valid");
          } else {
            console.log(errors);
            message.error("Invalid");
          }
        });
      },
      handleCancelClick () {
        this.$emit('cancel:update')
      }
    };
  }
});
</script>