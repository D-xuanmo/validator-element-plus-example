<template>
  <el-form ref="formRef" :model="form" label-width="300px">
    <el-form-item
      label="姓名"
      prop="cname"
      :required="form.cname.required"
      :error="validateErrors.cname"
    >
      <el-input v-model="form.cname.value" />
    </el-form-item>
    <el-form-item
      label="英文名"
      prop="name"
      :required="form.name.required"
      :error="validateErrors.name"
    >
      <el-input v-model="form.name.value" />
    </el-form-item>
    <el-form-item
      label="年龄(限制最小18，最大60)"
      prop="age"
      :required="form.age.required"
      :error="validateErrors.age"
    >
      <el-input-number v-model="form.age.value" />
    </el-form-item>
    <el-form-item
      label="性别"
      prop="sex"
      :required="form.sex.required"
      :error="validateErrors.sex"
    >
      <el-radio-group v-model="form.sex.value">
        <el-radio label="man">男</el-radio>
        <el-radio label="woman">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="手机号"
      prop="phone"
      :required="form.phone.required"
      :error="validateErrors.phone"
    >
      <el-input v-model="form.phone.value" />
    </el-form-item>
    <el-form-item
      label="身份证号"
      prop="IDCard"
      :required="form.IDCard.required"
      :error="validateErrors.IDCard"
    >
      <el-input v-model="form.IDCard.value" />
    </el-form-item>
    <el-form-item
      label="邮箱"
      prop="email"
      :required="form.email.required"
      :error="validateErrors.email"
    >
      <el-input v-model="form.email.value" />
    </el-form-item>
    <el-form-item
      label="长度限制"
      prop="lengthRule"
      :required="form.lengthRule.required"
      :error="validateErrors.lengthRule"
    >
      <el-input v-model="form.lengthRule.value" />
    </el-form-item>
    <el-form-item
      label="1.5s 的异步校验"
      prop="asyncRule"
      :required="form.asyncRule.required"
      :error="validateErrors.asyncRule"
    >
      <el-input v-model="form.asyncRule.value" />
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
const form = reactive<ValidateDataModel>({
  cname: { value: '', rules: 'cname', required: true },
  name: { value: '', rules: 'name', required: true },
  age: { value: undefined, rules: 'integer|between:18,60', required: true },
  sex: { value: '', required: true },
  phone: { value: '', rules: 'phone', required: true },
  IDCard: { value: '', rules: 'IDCard', required: true },
  email: { value: '', rules: 'email', required: true },
  asyncRule: { value: '', rules: 'asyncRule' },
  lengthRule: { value: '', rules: 'length:5' },
})

const submitForm = () => {
  submitLoading.value = true
  // 执行校验
  validate(form)
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
