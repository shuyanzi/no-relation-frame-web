import { createVisualEditorConfig } from "./utils";
import { ElButton, ElInput as Input, ElOption, ElSelect, ElTimePicker, ElInputNumber } from "element-plus";
import {
  createEditorColorProps,
  createEditorInputProps,
  createEditorSelectProps,
  createEditorTableProp,
} from "./props";
import { NumberRange } from "../components/number-range";

const [ElInput]: any[] = [Input];

export const visualConfig = createVisualEditorConfig()

visualConfig.registry("text", {
  label: "文本",
  preview: () => "预览文本",
  render: ({ props }) => (
    <span style={{ color: props.color, fontSize: props.size }}>
      {props.text || "默认文本"}
    </span>
  ),
  props: {
    text: createEditorInputProps("显示文本"),
    color: createEditorColorProps("字体颜色"),
    size: createEditorSelectProps("字体大小", [
      { label: "14px", val: "14px" },
      { label: "18px", val: "18px" },
      { label: "24px", val: "24px" },
    ]),
  },
});

visualConfig.registry("button", {
  label: "button",
  preview: () => <ElButton>Button</ElButton>,
  render: ({ props, size, custom }) => {
    return <ElButton
      {...custom}
      type={props.type}
      size={props.size}
      style={{
        width: size.width ? `${size.width}px` : undefined,
        height: size.height ? `${size.height}px` : undefined,
      }}
    >
      {props.label || "button"}
    </ElButton>
  },
  resize: { width: true, height: true },
  props: {
    label: createEditorInputProps("button"),
    type: createEditorSelectProps("按钮类型", [
      { label: "基础", val: "primary" },
      { label: "成功", val: "success" },
      { label: "警告", val: "warning" },
      { label: "危险", val: "danger" },
      { label: "提示", val: "info" },
      { label: "文本", val: "text" },
    ]),
    size: createEditorSelectProps("按钮大小", [
      { label: "默认", val: "" },
      { label: "中等", val: "medium" },
      { label: "小", val: "small" },
      { label: "极小", val: "mini" },
    ]),
  },
});

visualConfig.registry("number", {
  label: "number",
  preview: () => <ElInputNumber />,
  render: ({ model, size, custom }) => {
    return (
      <ElInputNumber
        {...custom}
        {...model.default}
        style={{ width: size.width ? `${size.width}px` : undefined }}
      />
    );
  },
  resize: { width: true },
  model: {
    default: "绑定字段",
  },
  props: {
    size: createEditorSelectProps("输入框大小", [
      { label: "默认", val: "" },
      { label: "中等", val: "medium" },
      { label: "小", val: "small" },
      { label: "极小", val: "mini" },
    ]),
  },
});
visualConfig.registry("input", {
  label: "输入框",
  preview: () => <ElInput modelValue={""} />,
  render: ({ model, size, custom }) => {
    return (
      <ElInput
        {...custom}
        {...model.default}
        style={{ width: size.width ? `${size.width}px` : undefined }}
      />
    );
  },
  resize: { width: true },
  model: {
    default: "绑定字段",
  },
  props: {
    size: createEditorSelectProps("输入框大小", [
      { label: "默认", val: "" },
      { label: "中等", val: "medium" },
      { label: "小", val: "small" },
      { label: "极小", val: "mini" },
    ]),
  },
});

visualConfig.registry("select", {
  label: "下拉框",
  preview: () => <ElSelect></ElSelect>,
  render: ({ props, model, custom }) => {
    return <ElSelect key={Math.random()} {...custom} {...model.default}>
      {(props.options || []).map(
        (
          opt: {
            label: string;
            value: string;
          },
          index: number
        ) => (
          <ElOption label={opt.label} value={opt.value} key={index}></ElOption>
        )
      )}
    </ElSelect>
  },
  props: {
    options: createEditorTableProp("下拉选项", {
      options: [
        { label: "显示值", field: "label" },
        { label: "绑定值", field: "value" },
        { label: "备注", field: "remark" },
      ],
      showKey: "label",
    }),
  },
  model: {
    default: "绑定字段",
  },
});

visualConfig.registry("number-range", {
  label: "数字范围输入框",
  resize: { width: true },
  preview: () => <NumberRange />,
  render: ({ model, size }) => (
    <NumberRange
      style={{ width: size.width ? `${size.width}px` : undefined }}
      {...{
        start: model.start.value,
        "update:start": model.start.onChange,
        end: model.end.value,
        "update:end": model.end.onChange,
      }}
    />
  ),

  model: {
    start: "起始绑定字段",
    end: "结束绑定字段",
  },
});

visualConfig.registry("image", {
  label: "图片",
  resize: { width: true, height: true },
  preview: () => (
    <div style="text-align:center">
      <div style="font-size:20px;background-color:#f2f2f2;color:#ccc;display:inline-flex;width:100%;">
        <i class="el-icon-picture"></i>
      </div>
    </div>
  ),
  render: ({ props, size }) => (
    <div
      style={{
        height: size.height ? `${size.height}px` : undefined,
        width: size.width ? `${size.width}px` : undefined,
      }}
      class="visual-block-image"
    >
      <img src={props.url} />
    </div>
  ),
  props: {
    url: createEditorInputProps("地址"),
  },
});
visualConfig.registry("datepicker", {
    label: "时间选择",
    preview: () => <ElTimePicker></ElTimePicker>,
    render: ({ props, model, custom }) => (
      <ElTimePicker key={Math.random()} {...custom} {...model.default}></ElTimePicker>
    ),
    props: {
      options: createEditorTableProp("下拉选项", {
        options: [
          { label: "显示值", field: "label" },
          { label: "绑定值", field: "value" },
          { label: "备注", field: "remark" },
        ],
        showKey: "label",
      }),
    },
    model: {
      default: "绑定字段",
    },
});

export default visualConfig;
