<template>
  <el-form ref="formRef" :model="formModel" label-width="300px">
    <el-form-item
      :label="formModel[0].label"
      prop="cname"
      :required="formModel[0].required"
      :error="validateErrors.cname"
    >
      <el-input v-model="formModel[0].value" />
    </el-form-item>
    <el-form-item
      :label="formModel[1].label"
      prop="name"
      :required="formModel[1].required"
      :error="validateErrors.name"
    >
      <el-input v-model="formModel[1].value" />
    </el-form-item>
    <el-form-item
      label="年龄(限制最小18，最大60)"
      prop="age"
      :required="formModel[2].required"
      :error="validateErrors.age"
    >
      <el-input-number v-model="formModel[2].value" />
    </el-form-item>
    <el-form-item
      :label="formModel[3].label"
      prop="sex"
      :required="formModel[3].required"
      :error="validateErrors.sex"
    >
      <el-radio-group v-model="formModel[3].value">
        <el-radio label="man">男</el-radio>
        <el-radio label="woman">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      :label="formModel[4].label"
      prop="phone"
      :required="formModel[4].required"
      :error="validateErrors.phone"
    >
      <el-input v-model="formModel[4].value" />
    </el-form-item>
    <el-form-item
      :label="formModel[5].label"
      prop="IDCard"
      :required="formModel[5].required"
      :error="validateErrors.IDCard"
    >
      <el-input v-model="formModel[5].value" />
    </el-form-item>
    <el-form-item
      :label="formModel[6].label"
      prop="email"
      :required="formModel[6].required"
      :error="validateErrors.email"
    >
      <el-input v-model="formModel[6].value" />
    </el-form-item>
    <el-form-item
      label="长度限制"
      prop="lengthRule"
      :required="formModel[7].required"
      :error="validateErrors.lengthRule"
    >
      <el-input v-model="formModel[7].value" />
    </el-form-item>
    <el-form-item
      label="1.5s 的异步校验"
      prop="asyncRule"
      :required="formModel[8].required"
      :error="validateErrors.asyncRule"
    >
      <el-input v-model="formModel[8].value" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :loading="submitLoading"
        @click="submitForm"
      >保存
      </el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ValidateDataModel, ValidateErrorType } from '@xuanmo/validator'
import { ElMessage, FormInstance } from 'element-plus'
import validate from '../validator'

const formRef = ref<FormInstance>()
const validateErrors = ref<Record<string, ValidateErrorType>>({})
const submitLoading = ref(false)

// 定义数据模型
const formModel = reactive<ValidateDataModel>([
  {
    dataKey: 'cname',
    value: '',
    rules: 'cname',
    required: true,
    label: '姓名'
  },
  {
    dataKey: 'name',
    value: '',
    rules: 'name',
    required: true,
    label: '英文名'
  },
  {
    dataKey: 'age',
    value: undefined,
    rules: 'integer|between:18,60',
    required: true,
    label: '年龄'
  },
  {
    dataKey: 'sex',
    value: '',
    required: true,
    label: '性别'
  },
  {
    dataKey: 'phone',
    value: '',
    rules: 'phone',
    required: true,
    label: '手机'
  },
  {
    dataKey: 'IDCard',
    value: '',
    rules: 'IDCard',
    required: true,
    label: '身份证'
  },
  {
    dataKey: 'email',
    value: '',
    rules: 'email',
    required: true,
    label: '邮箱'
  },
  {
    dataKey: 'lengthRule',
    value: '',
    rules: 'length:5'
  },
  {
    dataKey: 'asyncRule',
    value: '',
    rules: 'asyncRule'
  }
])

const submitForm = () => {
  submitLoading.value = true
  // 执行校验
  validate(formModel)
    .then(() => {
      ElMessage({
        message: '校验通过',
        type: 'success'
      })
    }).catch((error) => {
    validateErrors.value = error
  }).finally(() => (submitLoading.value = false))
}

const resetForm = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.resetFields()
}
</script>
