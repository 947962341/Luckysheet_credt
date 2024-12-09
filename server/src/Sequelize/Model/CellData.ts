/**
 * CellData 数据模型
 */

import { DataTypes, Model, Sequelize } from "sequelize";
import { WorkerSheetModel } from "./WorkerSheet";

/**
 * Sequelize 模型是 ES6 类. 你可以非常轻松地添加自定义实例或类级别的方法.
 */

export class CellDataModel extends Model {
  // 模型字段
  declare cell_data_id: string;
  declare worker_sheet_id: string;
  declare ctfa: string;
  declare ctt: string;
  declare bg?: string;
  declare ff?: string;
  declare fc?: string;
  declare fs?: number;
  declare bl?: boolean;
  declare it?: boolean;
  declare cl?: boolean;
  declare un?: boolean;
  declare vt?: number;
  declare ht?: number;
  declare v: string;
  declare m: string;
  declare f?: string;

  // 都需要导出一个 register 方法，用于注册模型
  static registerModule(sequelize: Sequelize) {
    CellDataModel.init(
      {
        cell_data_id: {
          type: DataTypes.STRING, // 类型
          allowNull: false, // 非空
          comment: "cell data id", // 描述
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4, // 默认使用 uuid 作为 主键ID
        },
        worker_sheet_id: {
          type: DataTypes.STRING, // 类型
          allowNull: false, // 非空
          comment: "外键：关联 worksheets 的 worker_sheet_id", // 描述
          references: {
            model: WorkerSheetModel,
            key: "worker_sheet_id",
          },
        },
        /** ctfa + ctt ==>  ct:{fa,t} 这两个字段共同构成 celldata.ct 字段的值，决定了如何显示单元格内容 */
        ctfa: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "ct:{fa} Format格式的定义串，'General'|'@'|'0'|'0.0'....",
          defaultValue: "General",
        },
        ctt: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "ct:{t} Type类型,'g'|'s'|'n'....",
          defaultValue: "g",
        },
        bg: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: "背景色",
          defaultValue: "#FFFFFF",
        },
        ff: {
          type: DataTypes.STRING,
          allowNull: true,
          comment:
            "0 Times New Roman、 1 Arial、2 Tahoma 、3 Verdana、4 微软雅黑、5 宋体（Song）、6 黑体（ST Heiti）、7 楷体（ST Kaiti）、 8 仿宋（ST FangSong）、9 新宋体（ST Song）、10 华文新魏、11 华文行楷、12 华文隶书",
          defaultValue: "5",
        },
        fc: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: "字体颜色",
          defaultValue: "#fff000",
        },
        fs: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "字体大小",
          defaultValue: 12,
        },
        bl: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          comment: "是否加粗",
          defaultValue: false,
        },
        it: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          comment: "是否斜体",
          defaultValue: false,
        },
        cl: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          comment: "是否删除线",
          defaultValue: false,
        },
        un: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          comment: "是否下划线",
          defaultValue: false,
        },
        vt: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "垂直居中 0 中间、1 上、2下",
          defaultValue: 0,
        },
        ht: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "水平居中 0 居中、1 左、2右",
          defaultValue: 0,
        },
        // tr rt tb 不想实现了
        // v m 的取值逻辑由 ct：{fa t} 决定
        v: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "原始值",
        },
        m: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "显示值",
        },
        f: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: "公式",
        },
      },
      {
        sequelize, // 将模型与 Sequelize 实例关联
        tableName: "celldatas", // 直接式提供数据库表名
      }
    );
  }
}
