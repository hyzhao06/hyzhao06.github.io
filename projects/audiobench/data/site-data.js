window.SITE_DATA = {
  "meta": {
    "built_on": "2026-09-17",
    "manifest": "Finetune/manifests/research/annotated.jsonl",
    "speaker_count": 126,
    "annotated_rows": 243188,
    "final_train_rows": 170011,
    "final_test_rows": 52073,
    "control_rows": 21055,
    "control_paired_rows": 13474
  },
  "severity_scale": [
    {
      "key": "control",
      "label": "健康",
      "rank": 0
    },
    {
      "key": "mild",
      "label": "轻度",
      "rank": 1
    },
    {
      "key": "moderate",
      "label": "中度",
      "rank": 2
    },
    {
      "key": "severe",
      "label": "重度",
      "rank": 3
    },
    {
      "key": "profound",
      "label": "极重度",
      "rank": 4
    },
    {
      "key": "unknown",
      "label": "未标注",
      "rank": null
    }
  ],
  "datasets": [
    {
      "id": "cdsd",
      "label": "CDSD",
      "speaker_count": 44,
      "row_count": 147854,
      "research_splits": {
        "excluded_train": 1,
        "test": 29570,
        "train": 118283
      },
      "severity_speakers": {
        "unknown": 44
      }
    },
    {
      "id": "easycall",
      "label": "EasyCall",
      "speaker_count": 55,
      "row_count": 21386,
      "research_splits": {
        "control_eval": 10077,
        "dev": 2095,
        "excluded_train": 11,
        "test": 2717,
        "train": 6486
      },
      "severity_speakers": {
        "mild": 16,
        "moderate": 8,
        "unknown": 1,
        "severe": 6,
        "control": 24
      }
    },
    {
      "id": "torgo",
      "label": "TORGO",
      "speaker_count": 15,
      "row_count": 16552,
      "research_splits": {
        "control_eval": 10978,
        "excluded_train": 8,
        "test": 1046,
        "train": 4520
      },
      "severity_speakers": {
        "profound": 4,
        "moderate": 1,
        "mild": 2,
        "control": 7,
        "severe": 1
      }
    },
    {
      "id": "uaspeech",
      "label": "UA-Speech",
      "speaker_count": 12,
      "row_count": 57396,
      "research_splits": {
        "excluded_train": 29,
        "test": 18740,
        "train": 38627
      },
      "severity_speakers": {
        "severe": 2,
        "profound": 3,
        "moderate": 3,
        "mild": 4
      }
    }
  ],
  "speakers": [
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "01",
      "rows": 13841,
      "native_splits": {
        "未标注": 13841
      },
      "source_parts": {
        "part-a": 1107,
        "part-b": 12734
      },
      "source_groups": {
        "dysarthric": 13841
      },
      "research_splits": {
        "train": 13841
      },
      "folds": {
        "fold 2": 13841
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "02",
      "rows": 6760,
      "native_splits": {
        "未标注": 6760
      },
      "source_parts": {
        "part-a": 988,
        "part-b": 5772
      },
      "source_groups": {
        "dysarthric": 6760
      },
      "research_splits": {
        "test": 6760
      },
      "folds": {
        "—": 6760
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "03",
      "rows": 926,
      "native_splits": {
        "未标注": 926
      },
      "source_parts": {
        "part-a": 926
      },
      "source_groups": {
        "dysarthric": 926
      },
      "research_splits": {
        "train": 926
      },
      "folds": {
        "fold 3": 926
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "04",
      "rows": 12347,
      "native_splits": {
        "未标注": 12347
      },
      "source_parts": {
        "part-a": 1035,
        "part-b": 11312
      },
      "source_groups": {
        "dysarthric": 12347
      },
      "research_splits": {
        "train": 12347
      },
      "folds": {
        "fold 3": 12347
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "05",
      "rows": 1191,
      "native_splits": {
        "未标注": 1191
      },
      "source_parts": {
        "part-a": 1191
      },
      "source_groups": {
        "dysarthric": 1191
      },
      "research_splits": {
        "train": 1191
      },
      "folds": {
        "fold 1": 1191
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "06",
      "rows": 11278,
      "native_splits": {
        "未标注": 11278
      },
      "source_parts": {
        "part-a": 969,
        "part-b": 10309
      },
      "source_groups": {
        "dysarthric": 11278
      },
      "research_splits": {
        "train": 11278
      },
      "folds": {
        "fold 4": 11278
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "07",
      "rows": 1719,
      "native_splits": {
        "未标注": 1719
      },
      "source_parts": {
        "part-a": 1719
      },
      "source_groups": {
        "dysarthric": 1719
      },
      "research_splits": {
        "test": 1719
      },
      "folds": {
        "—": 1719
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "08",
      "rows": 15468,
      "native_splits": {
        "未标注": 15468
      },
      "source_parts": {
        "part-a": 998,
        "part-b": 14470
      },
      "source_groups": {
        "dysarthric": 15468
      },
      "research_splits": {
        "test": 15468
      },
      "folds": {
        "—": 15468
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "09",
      "rows": 15646,
      "native_splits": {
        "未标注": 15646
      },
      "source_parts": {
        "part-a": 1156,
        "part-b": 14490
      },
      "source_groups": {
        "dysarthric": 15646
      },
      "research_splits": {
        "train": 15646
      },
      "folds": {
        "fold 1": 15646
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "10",
      "rows": 1129,
      "native_splits": {
        "未标注": 1129
      },
      "source_parts": {
        "part-a": 1129
      },
      "source_groups": {
        "dysarthric": 1129
      },
      "research_splits": {
        "train": 1129
      },
      "folds": {
        "fold 0": 1129
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "11",
      "rows": 1195,
      "native_splits": {
        "未标注": 1195
      },
      "source_parts": {
        "part-a": 1195
      },
      "source_groups": {
        "dysarthric": 1195
      },
      "research_splits": {
        "train": 1195
      },
      "folds": {
        "fold 4": 1195
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "12",
      "rows": 16721,
      "native_splits": {
        "未标注": 16721
      },
      "source_parts": {
        "part-a": 1155,
        "part-b": 15566
      },
      "source_groups": {
        "dysarthric": 16721
      },
      "research_splits": {
        "excluded_train": 1,
        "train": 16720
      },
      "folds": {
        "fold 0": 16720,
        "—": 1
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "13",
      "rows": 1092,
      "native_splits": {
        "未标注": 1092
      },
      "source_parts": {
        "part-a": 1092
      },
      "source_groups": {
        "dysarthric": 1092
      },
      "research_splits": {
        "test": 1092
      },
      "folds": {
        "—": 1092
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "14",
      "rows": 1311,
      "native_splits": {
        "未标注": 1311
      },
      "source_parts": {
        "part-a": 1311
      },
      "source_groups": {
        "dysarthric": 1311
      },
      "research_splits": {
        "train": 1311
      },
      "folds": {
        "fold 0": 1311
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "15",
      "rows": 1271,
      "native_splits": {
        "未标注": 1271
      },
      "source_parts": {
        "part-a": 1271
      },
      "source_groups": {
        "dysarthric": 1271
      },
      "research_splits": {
        "train": 1271
      },
      "folds": {
        "fold 1": 1271
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "16",
      "rows": 945,
      "native_splits": {
        "未标注": 945
      },
      "source_parts": {
        "part-a": 945
      },
      "source_groups": {
        "dysarthric": 945
      },
      "research_splits": {
        "train": 945
      },
      "folds": {
        "fold 1": 945
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "17",
      "rows": 979,
      "native_splits": {
        "未标注": 979
      },
      "source_parts": {
        "part-a": 979
      },
      "source_groups": {
        "dysarthric": 979
      },
      "research_splits": {
        "train": 979
      },
      "folds": {
        "fold 2": 979
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "18",
      "rows": 2253,
      "native_splits": {
        "未标注": 2253
      },
      "source_parts": {
        "part-a": 2253
      },
      "source_groups": {
        "dysarthric": 2253
      },
      "research_splits": {
        "train": 2253
      },
      "folds": {
        "fold 1": 2253
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "19",
      "rows": 1071,
      "native_splits": {
        "未标注": 1071
      },
      "source_parts": {
        "part-a": 1071
      },
      "source_groups": {
        "dysarthric": 1071
      },
      "research_splits": {
        "train": 1071
      },
      "folds": {
        "fold 3": 1071
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "20",
      "rows": 9013,
      "native_splits": {
        "未标注": 9013
      },
      "source_parts": {
        "part-a": 936,
        "part-b": 8077
      },
      "source_groups": {
        "dysarthric": 9013
      },
      "research_splits": {
        "train": 9013
      },
      "folds": {
        "fold 4": 9013
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "21",
      "rows": 1071,
      "native_splits": {
        "未标注": 1071
      },
      "source_parts": {
        "part-a": 1071
      },
      "source_groups": {
        "dysarthric": 1071
      },
      "research_splits": {
        "train": 1071
      },
      "folds": {
        "fold 1": 1071
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "22",
      "rows": 1866,
      "native_splits": {
        "未标注": 1866
      },
      "source_parts": {
        "part-a": 1866
      },
      "source_groups": {
        "dysarthric": 1866
      },
      "research_splits": {
        "train": 1866
      },
      "folds": {
        "fold 2": 1866
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "23",
      "rows": 2767,
      "native_splits": {
        "未标注": 2767
      },
      "source_parts": {
        "part-a": 2767
      },
      "source_groups": {
        "dysarthric": 2767
      },
      "research_splits": {
        "train": 2767
      },
      "folds": {
        "fold 2": 2767
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "24",
      "rows": 1717,
      "native_splits": {
        "未标注": 1717
      },
      "source_parts": {
        "part-a": 1717
      },
      "source_groups": {
        "dysarthric": 1717
      },
      "research_splits": {
        "train": 1717
      },
      "folds": {
        "fold 0": 1717
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "25",
      "rows": 1304,
      "native_splits": {
        "未标注": 1304
      },
      "source_parts": {
        "part-a": 1304
      },
      "source_groups": {
        "dysarthric": 1304
      },
      "research_splits": {
        "train": 1304
      },
      "folds": {
        "fold 2": 1304
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "26",
      "rows": 651,
      "native_splits": {
        "未标注": 651
      },
      "source_parts": {
        "part-a": 651
      },
      "source_groups": {
        "dysarthric": 651
      },
      "research_splits": {
        "test": 651
      },
      "folds": {
        "—": 651
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "27",
      "rows": 1504,
      "native_splits": {
        "未标注": 1504
      },
      "source_parts": {
        "part-a": 1504
      },
      "source_groups": {
        "dysarthric": 1504
      },
      "research_splits": {
        "train": 1504
      },
      "folds": {
        "fold 3": 1504
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "28",
      "rows": 1186,
      "native_splits": {
        "未标注": 1186
      },
      "source_parts": {
        "part-a": 1186
      },
      "source_groups": {
        "dysarthric": 1186
      },
      "research_splits": {
        "train": 1186
      },
      "folds": {
        "fold 3": 1186
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "29",
      "rows": 956,
      "native_splits": {
        "未标注": 956
      },
      "source_parts": {
        "part-a": 956
      },
      "source_groups": {
        "dysarthric": 956
      },
      "research_splits": {
        "test": 956
      },
      "folds": {
        "—": 956
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "30",
      "rows": 1201,
      "native_splits": {
        "未标注": 1201
      },
      "source_parts": {
        "part-a": 1201
      },
      "source_groups": {
        "dysarthric": 1201
      },
      "research_splits": {
        "train": 1201
      },
      "folds": {
        "fold 2": 1201
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "31",
      "rows": 3514,
      "native_splits": {
        "未标注": 3514
      },
      "source_parts": {
        "part-a": 3514
      },
      "source_groups": {
        "dysarthric": 3514
      },
      "research_splits": {
        "train": 3514
      },
      "folds": {
        "fold 3": 3514
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "32",
      "rows": 838,
      "native_splits": {
        "未标注": 838
      },
      "source_parts": {
        "part-a": 838
      },
      "source_groups": {
        "dysarthric": 838
      },
      "research_splits": {
        "train": 838
      },
      "folds": {
        "fold 0": 838
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "33",
      "rows": 1979,
      "native_splits": {
        "未标注": 1979
      },
      "source_parts": {
        "part-a": 1979
      },
      "source_groups": {
        "dysarthric": 1979
      },
      "research_splits": {
        "train": 1979
      },
      "folds": {
        "fold 3": 1979
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "34",
      "rows": 993,
      "native_splits": {
        "未标注": 993
      },
      "source_parts": {
        "part-a": 993
      },
      "source_groups": {
        "dysarthric": 993
      },
      "research_splits": {
        "train": 993
      },
      "folds": {
        "fold 0": 993
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "35",
      "rows": 314,
      "native_splits": {
        "未标注": 314
      },
      "source_parts": {
        "part-a": 314
      },
      "source_groups": {
        "dysarthric": 314
      },
      "research_splits": {
        "train": 314
      },
      "folds": {
        "fold 2": 314
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "36",
      "rows": 969,
      "native_splits": {
        "未标注": 969
      },
      "source_parts": {
        "part-a": 969
      },
      "source_groups": {
        "dysarthric": 969
      },
      "research_splits": {
        "train": 969
      },
      "folds": {
        "fold 4": 969
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "37",
      "rows": 1081,
      "native_splits": {
        "未标注": 1081
      },
      "source_parts": {
        "part-a": 1081
      },
      "source_groups": {
        "dysarthric": 1081
      },
      "research_splits": {
        "train": 1081
      },
      "folds": {
        "fold 4": 1081
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "38",
      "rows": 1210,
      "native_splits": {
        "未标注": 1210
      },
      "source_parts": {
        "part-a": 1210
      },
      "source_groups": {
        "dysarthric": 1210
      },
      "research_splits": {
        "train": 1210
      },
      "folds": {
        "fold 3": 1210
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "39",
      "rows": 1024,
      "native_splits": {
        "未标注": 1024
      },
      "source_parts": {
        "part-a": 1024
      },
      "source_groups": {
        "dysarthric": 1024
      },
      "research_splits": {
        "test": 1024
      },
      "folds": {
        "—": 1024
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "40",
      "rows": 1204,
      "native_splits": {
        "未标注": 1204
      },
      "source_parts": {
        "part-a": 1204
      },
      "source_groups": {
        "dysarthric": 1204
      },
      "research_splits": {
        "train": 1204
      },
      "folds": {
        "fold 0": 1204
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "41",
      "rows": 880,
      "native_splits": {
        "未标注": 880
      },
      "source_parts": {
        "part-a": 880
      },
      "source_groups": {
        "dysarthric": 880
      },
      "research_splits": {
        "test": 880
      },
      "folds": {
        "—": 880
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "42",
      "rows": 1126,
      "native_splits": {
        "未标注": 1126
      },
      "source_parts": {
        "part-a": 1126
      },
      "source_groups": {
        "dysarthric": 1126
      },
      "research_splits": {
        "train": 1126
      },
      "folds": {
        "fold 2": 1126
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "43",
      "rows": 1020,
      "native_splits": {
        "未标注": 1020
      },
      "source_parts": {
        "part-a": 1020
      },
      "source_groups": {
        "dysarthric": 1020
      },
      "research_splits": {
        "test": 1020
      },
      "folds": {
        "—": 1020
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "cdsd",
      "dataset_label": "CDSD",
      "speaker_id": "44",
      "rows": 1323,
      "native_splits": {
        "未标注": 1323
      },
      "source_parts": {
        "part-a": 1323
      },
      "source_groups": {
        "dysarthric": 1323
      },
      "research_splits": {
        "train": 1323
      },
      "folds": {
        "fold 1": 1323
      },
      "clinical_group": "dysarthric",
      "language": "zh",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "unknown",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f01",
      "rows": 330,
      "native_splits": {
        "train": 330
      },
      "source_parts": {
        "未标注": 330
      },
      "source_groups": {
        "dysarthric": 330
      },
      "research_splits": {
        "excluded_train": 1,
        "train": 329
      },
      "folds": {
        "fold 3": 329,
        "—": 1
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f02",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "dysarthric": 396
      },
      "research_splits": {
        "excluded_train": 1,
        "train": 395
      },
      "folds": {
        "fold 2": 395,
        "—": 1
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "2",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f03",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "dysarthric": 396
      },
      "research_splits": {
        "train": 396
      },
      "folds": {
        "fold 4": 396
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f04",
      "rows": 234,
      "native_splits": {
        "test": 234
      },
      "source_parts": {
        "未标注": 234
      },
      "source_groups": {
        "dysarthric": 234
      },
      "research_splits": {
        "test": 234
      },
      "folds": {
        "—": 234
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "n/a",
      "severity_label": "未标注",
      "severity_key": "unknown",
      "severity_rank": null
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f05",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "train": 414
      },
      "folds": {
        "fold 2": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f06",
      "rows": 414,
      "native_splits": {
        "test": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "test": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f07",
      "rows": 414,
      "native_splits": {
        "validation": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "dev": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "dev",
      "original_group": "validation",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f08",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "train": 414
      },
      "folds": {
        "fold 0": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f09",
      "rows": 414,
      "native_splits": {
        "test": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "test": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f10",
      "rows": 138,
      "native_splits": {
        "train": 138
      },
      "source_parts": {
        "未标注": 138
      },
      "source_groups": {
        "dysarthric": 138
      },
      "research_splits": {
        "train": 138
      },
      "folds": {
        "fold 2": 138
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "3",
      "severity_label": "重度",
      "severity_key": "severe",
      "severity_rank": 3
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "f11",
      "rows": 345,
      "native_splits": {
        "validation": 345
      },
      "source_parts": {
        "未标注": 345
      },
      "source_groups": {
        "dysarthric": 345
      },
      "research_splits": {
        "dev": 345
      },
      "folds": {
        "—": 345
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "dev",
      "original_group": "validation",
      "severity_raw": "2",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "fc01",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "control": 396
      },
      "research_splits": {
        "control_eval": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "fc02",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "control": 396
      },
      "research_splits": {
        "control_eval": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "fc03",
      "rows": 396,
      "native_splits": {
        "validation": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "control": 396
      },
      "research_splits": {
        "control_eval": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "validation",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "fc04",
      "rows": 396,
      "native_splits": {
        "test": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "control": 396
      },
      "research_splits": {
        "control_eval": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "test",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "fc05",
      "rows": 483,
      "native_splits": {
        "validation": 483
      },
      "source_parts": {
        "未标注": 483
      },
      "source_groups": {
        "control": 483
      },
      "research_splits": {
        "control_eval": 483
      },
      "folds": {
        "—": 483
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "validation",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "fc06",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "fc07",
      "rows": 414,
      "native_splits": {
        "test": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "test",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "fc08",
      "rows": 552,
      "native_splits": {
        "train": 552
      },
      "source_parts": {
        "未标注": 552
      },
      "source_groups": {
        "control": 552
      },
      "research_splits": {
        "control_eval": 552
      },
      "folds": {
        "—": 552
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "fc09",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "fc10",
      "rows": 414,
      "native_splits": {
        "test": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "test",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m01",
      "rows": 395,
      "native_splits": {
        "train": 395
      },
      "source_parts": {
        "未标注": 395
      },
      "source_groups": {
        "dysarthric": 395
      },
      "research_splits": {
        "train": 395
      },
      "folds": {
        "fold 1": 395
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "2",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m02",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "dysarthric": 396
      },
      "research_splits": {
        "train": 396
      },
      "folds": {
        "fold 0": 396
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m03",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "dysarthric": 396
      },
      "research_splits": {
        "train": 396
      },
      "folds": {
        "fold 4": 396
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "2",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m04",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "dysarthric": 396
      },
      "research_splits": {
        "train": 396
      },
      "folds": {
        "fold 1": 396
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m05",
      "rows": 396,
      "native_splits": {
        "validation": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "dysarthric": 396
      },
      "research_splits": {
        "dev": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "dev",
      "original_group": "validation",
      "severity_raw": "3",
      "severity_label": "重度",
      "severity_key": "severe",
      "severity_rank": 3
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m06",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "dysarthric": 396
      },
      "research_splits": {
        "train": 396
      },
      "folds": {
        "fold 0": 396
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "3",
      "severity_label": "重度",
      "severity_key": "severe",
      "severity_rank": 3
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m07",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "dysarthric": 396
      },
      "research_splits": {
        "train": 396
      },
      "folds": {
        "fold 2": 396
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "3",
      "severity_label": "重度",
      "severity_key": "severe",
      "severity_rank": 3
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m08",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "dysarthric": 396
      },
      "research_splits": {
        "train": 396
      },
      "folds": {
        "fold 3": 396
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "2",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m09",
      "rows": 396,
      "native_splits": {
        "validation": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "dysarthric": 396
      },
      "research_splits": {
        "dev": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "dev",
      "original_group": "validation",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m10",
      "rows": 413,
      "native_splits": {
        "test": 413
      },
      "source_parts": {
        "未标注": 413
      },
      "source_groups": {
        "dysarthric": 413
      },
      "research_splits": {
        "test": 413
      },
      "folds": {
        "—": 413
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "2",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m11",
      "rows": 414,
      "native_splits": {
        "test": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "test": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "3",
      "severity_label": "重度",
      "severity_key": "severe",
      "severity_rank": 3
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m12",
      "rows": 414,
      "native_splits": {
        "test": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "test": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m13",
      "rows": 414,
      "native_splits": {
        "validation": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "dev": 407,
        "excluded_train": 7
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "dev",
      "original_group": "validation",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m14",
      "rows": 181,
      "native_splits": {
        "train": 181
      },
      "source_parts": {
        "未标注": 181
      },
      "source_groups": {
        "dysarthric": 181
      },
      "research_splits": {
        "train": 181
      },
      "folds": {
        "fold 1": 181
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "3",
      "severity_label": "重度",
      "severity_key": "severe",
      "severity_rank": 3
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m15",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "train": 414
      },
      "folds": {
        "fold 3": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m16",
      "rows": 138,
      "native_splits": {
        "validation": 138
      },
      "source_parts": {
        "未标注": 138
      },
      "source_groups": {
        "dysarthric": 138
      },
      "research_splits": {
        "dev": 137,
        "excluded_train": 1
      },
      "folds": {
        "—": 138
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "dev",
      "original_group": "validation",
      "severity_raw": "2",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m17",
      "rows": 414,
      "native_splits": {
        "test": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "test": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m18",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "train": 414
      },
      "folds": {
        "fold 1": 414
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m19",
      "rows": 207,
      "native_splits": {
        "train": 207
      },
      "source_parts": {
        "未标注": 207
      },
      "source_groups": {
        "dysarthric": 207
      },
      "research_splits": {
        "train": 207
      },
      "folds": {
        "fold 3": 207
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "2",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "m20",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "dysarthric": 414
      },
      "research_splits": {
        "excluded_train": 1,
        "train": 413
      },
      "folds": {
        "fold 4": 413,
        "—": 1
      },
      "clinical_group": "dysarthric",
      "language": "it",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "1",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc01",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "control": 396
      },
      "research_splits": {
        "control_eval": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc02",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "control": 396
      },
      "research_splits": {
        "control_eval": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc03",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "control": 396
      },
      "research_splits": {
        "control_eval": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc04",
      "rows": 396,
      "native_splits": {
        "test": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "control": 396
      },
      "research_splits": {
        "control_eval": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "test",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc05",
      "rows": 462,
      "native_splits": {
        "validation": 462
      },
      "source_parts": {
        "未标注": 462
      },
      "source_groups": {
        "control": 462
      },
      "research_splits": {
        "control_eval": 462
      },
      "folds": {
        "—": 462
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "validation",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc06",
      "rows": 396,
      "native_splits": {
        "train": 396
      },
      "source_parts": {
        "未标注": 396
      },
      "source_groups": {
        "control": 396
      },
      "research_splits": {
        "control_eval": 396
      },
      "folds": {
        "—": 396
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc07",
      "rows": 462,
      "native_splits": {
        "test": 462
      },
      "source_parts": {
        "未标注": 462
      },
      "source_groups": {
        "control": 462
      },
      "research_splits": {
        "control_eval": 462
      },
      "folds": {
        "—": 462
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "test",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc08",
      "rows": 414,
      "native_splits": {
        "validation": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "validation",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc09",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc10",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc11",
      "rows": 414,
      "native_splits": {
        "test": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "test",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc12",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc13",
      "rows": 414,
      "native_splits": {
        "train": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "train",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "easycall",
      "dataset_label": "EasyCall",
      "speaker_id": "mc14",
      "rows": 414,
      "native_splits": {
        "validation": 414
      },
      "source_parts": {
        "未标注": 414
      },
      "source_groups": {
        "control": 414
      },
      "research_splits": {
        "control_eval": 414
      },
      "folds": {
        "—": 414
      },
      "clinical_group": "control",
      "language": "it",
      "primary_assignment": "control_eval",
      "original_group": "validation",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "F01",
      "rows": 236,
      "native_splits": {
        "未标注": 236
      },
      "source_parts": {
        "未标注": 236
      },
      "source_groups": {
        "dysarthric": 236
      },
      "research_splits": {
        "test": 236
      },
      "folds": {
        "—": 236
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "severe",
      "severity_label": "极重度",
      "severity_key": "profound",
      "severity_rank": 4
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "F03",
      "rows": 1087,
      "native_splits": {
        "未标注": 1087
      },
      "source_parts": {
        "未标注": 1087
      },
      "source_groups": {
        "dysarthric": 1087
      },
      "research_splits": {
        "excluded_train": 6,
        "train": 1081
      },
      "folds": {
        "fold 0": 1081,
        "—": 6
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "moderate",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "F04",
      "rows": 673,
      "native_splits": {
        "未标注": 673
      },
      "source_parts": {
        "未标注": 673
      },
      "source_groups": {
        "dysarthric": 673
      },
      "research_splits": {
        "train": 673
      },
      "folds": {
        "fold 3": 673
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "mild",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "FC01",
      "rows": 302,
      "native_splits": {
        "未标注": 302
      },
      "source_parts": {
        "未标注": 302
      },
      "source_groups": {
        "control": 302
      },
      "research_splits": {
        "control_eval": 302
      },
      "folds": {
        "—": 302
      },
      "clinical_group": "control",
      "language": "en",
      "primary_assignment": "control_eval",
      "original_group": "无原始划分",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "FC02",
      "rows": 2187,
      "native_splits": {
        "未标注": 2187
      },
      "source_parts": {
        "未标注": 2187
      },
      "source_groups": {
        "control": 2187
      },
      "research_splits": {
        "control_eval": 2187
      },
      "folds": {
        "—": 2187
      },
      "clinical_group": "control",
      "language": "en",
      "primary_assignment": "control_eval",
      "original_group": "无原始划分",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "FC03",
      "rows": 1922,
      "native_splits": {
        "未标注": 1922
      },
      "source_parts": {
        "未标注": 1922
      },
      "source_groups": {
        "control": 1922
      },
      "research_splits": {
        "control_eval": 1922
      },
      "folds": {
        "—": 1922
      },
      "clinical_group": "control",
      "language": "en",
      "primary_assignment": "control_eval",
      "original_group": "无原始划分",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "M01",
      "rows": 743,
      "native_splits": {
        "未标注": 743
      },
      "source_parts": {
        "未标注": 743
      },
      "source_groups": {
        "dysarthric": 743
      },
      "research_splits": {
        "excluded_train": 2,
        "train": 741
      },
      "folds": {
        "fold 2": 741,
        "—": 2
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "severe",
      "severity_label": "极重度",
      "severity_key": "profound",
      "severity_rank": 4
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "M02",
      "rows": 772,
      "native_splits": {
        "未标注": 772
      },
      "source_parts": {
        "未标注": 772
      },
      "source_groups": {
        "dysarthric": 772
      },
      "research_splits": {
        "train": 772
      },
      "folds": {
        "fold 1": 772
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "severe",
      "severity_label": "极重度",
      "severity_key": "profound",
      "severity_rank": 4
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "M03",
      "rows": 810,
      "native_splits": {
        "未标注": 810
      },
      "source_parts": {
        "未标注": 810
      },
      "source_groups": {
        "dysarthric": 810
      },
      "research_splits": {
        "test": 810
      },
      "folds": {
        "—": 810
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "test",
      "original_group": "无原始划分",
      "severity_raw": "mild",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "M04",
      "rows": 666,
      "native_splits": {
        "未标注": 666
      },
      "source_parts": {
        "未标注": 666
      },
      "source_groups": {
        "dysarthric": 666
      },
      "research_splits": {
        "train": 666
      },
      "folds": {
        "fold 4": 666
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "severe",
      "severity_label": "极重度",
      "severity_key": "profound",
      "severity_rank": 4
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "M05",
      "rows": 587,
      "native_splits": {
        "未标注": 587
      },
      "source_parts": {
        "未标注": 587
      },
      "source_groups": {
        "dysarthric": 587
      },
      "research_splits": {
        "train": 587
      },
      "folds": {
        "fold 4": 587
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "无原始划分",
      "severity_raw": "moderate-severe",
      "severity_label": "重度",
      "severity_key": "severe",
      "severity_rank": 3
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "MC01",
      "rows": 2155,
      "native_splits": {
        "未标注": 2155
      },
      "source_parts": {
        "未标注": 2155
      },
      "source_groups": {
        "control": 2155
      },
      "research_splits": {
        "control_eval": 2155
      },
      "folds": {
        "—": 2155
      },
      "clinical_group": "control",
      "language": "en",
      "primary_assignment": "control_eval",
      "original_group": "无原始划分",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "MC02",
      "rows": 1123,
      "native_splits": {
        "未标注": 1123
      },
      "source_parts": {
        "未标注": 1123
      },
      "source_groups": {
        "control": 1123
      },
      "research_splits": {
        "control_eval": 1123
      },
      "folds": {
        "—": 1123
      },
      "clinical_group": "control",
      "language": "en",
      "primary_assignment": "control_eval",
      "original_group": "无原始划分",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "MC03",
      "rows": 1669,
      "native_splits": {
        "未标注": 1669
      },
      "source_parts": {
        "未标注": 1669
      },
      "source_groups": {
        "control": 1669
      },
      "research_splits": {
        "control_eval": 1669
      },
      "folds": {
        "—": 1669
      },
      "clinical_group": "control",
      "language": "en",
      "primary_assignment": "control_eval",
      "original_group": "无原始划分",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "torgo",
      "dataset_label": "TORGO",
      "speaker_id": "MC04",
      "rows": 1620,
      "native_splits": {
        "未标注": 1620
      },
      "source_parts": {
        "未标注": 1620
      },
      "source_groups": {
        "control": 1620
      },
      "research_splits": {
        "control_eval": 1620
      },
      "folds": {
        "—": 1620
      },
      "clinical_group": "control",
      "language": "en",
      "primary_assignment": "control_eval",
      "original_group": "无原始划分",
      "severity_raw": "control",
      "severity_label": "健康",
      "severity_key": "control",
      "severity_rank": 0
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "F02",
      "rows": 5355,
      "native_splits": {
        "train": 5355
      },
      "source_parts": {
        "B1": 1785,
        "B2": 1785,
        "B3": 1785
      },
      "source_groups": {
        "dysarthric": 5355
      },
      "research_splits": {
        "train": 5355
      },
      "folds": {
        "fold 3": 5355
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "medium",
      "severity_label": "重度",
      "severity_key": "severe",
      "severity_rank": 3
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "F03",
      "rows": 5184,
      "native_splits": {
        "test": 5184
      },
      "source_parts": {
        "B1": 1785,
        "B2": 1783,
        "B3": 1616
      },
      "source_groups": {
        "dysarthric": 5184
      },
      "research_splits": {
        "test": 5184
      },
      "folds": {
        "—": 5184
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "high",
      "severity_label": "极重度",
      "severity_key": "profound",
      "severity_rank": 4
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "F04",
      "rows": 5251,
      "native_splits": {
        "train": 5251
      },
      "source_parts": {
        "B1": 1707,
        "B2": 1759,
        "B3": 1785
      },
      "source_groups": {
        "dysarthric": 5251
      },
      "research_splits": {
        "train": 5251
      },
      "folds": {
        "fold 4": 5251
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "low",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "F05",
      "rows": 5355,
      "native_splits": {
        "test": 5355
      },
      "source_parts": {
        "B1": 1785,
        "B2": 1785,
        "B3": 1785
      },
      "source_groups": {
        "dysarthric": 5355
      },
      "research_splits": {
        "test": 5355
      },
      "folds": {
        "—": 5355
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "very low",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "M01",
      "rows": 2805,
      "native_splits": {
        "train": 2805
      },
      "source_parts": {
        "B1": 1020,
        "B2": 1020,
        "B3": 765
      },
      "source_groups": {
        "dysarthric": 2805
      },
      "research_splits": {
        "excluded_train": 22,
        "train": 2783
      },
      "folds": {
        "fold 1": 2783,
        "—": 22
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "high",
      "severity_label": "极重度",
      "severity_key": "profound",
      "severity_rank": 4
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "M04",
      "rows": 3825,
      "native_splits": {
        "train": 3825
      },
      "source_parts": {
        "B1": 1275,
        "B2": 1275,
        "B3": 1275
      },
      "source_groups": {
        "dysarthric": 3825
      },
      "research_splits": {
        "train": 3825
      },
      "folds": {
        "fold 0": 3825
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "high",
      "severity_label": "极重度",
      "severity_key": "profound",
      "severity_rank": 4
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "M05",
      "rows": 5355,
      "native_splits": {
        "train": 5355
      },
      "source_parts": {
        "B1": 1785,
        "B2": 1785,
        "B3": 1785
      },
      "source_groups": {
        "dysarthric": 5355
      },
      "research_splits": {
        "train": 5355
      },
      "folds": {
        "fold 2": 5355
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "low",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "M07",
      "rows": 5355,
      "native_splits": {
        "train": 5355
      },
      "source_parts": {
        "B1": 1785,
        "B2": 1785,
        "B3": 1785
      },
      "source_groups": {
        "dysarthric": 5355
      },
      "research_splits": {
        "train": 5355
      },
      "folds": {
        "fold 0": 5355
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "medium",
      "severity_label": "重度",
      "severity_key": "severe",
      "severity_rank": 3
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "M08",
      "rows": 5355,
      "native_splits": {
        "test": 5355
      },
      "source_parts": {
        "B1": 1785,
        "B2": 1785,
        "B3": 1785
      },
      "source_groups": {
        "dysarthric": 5355
      },
      "research_splits": {
        "test": 5355
      },
      "folds": {
        "—": 5355
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "very low",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "M09",
      "rows": 5355,
      "native_splits": {
        "train": 5355
      },
      "source_parts": {
        "B1": 1785,
        "B2": 1785,
        "B3": 1785
      },
      "source_groups": {
        "dysarthric": 5355
      },
      "research_splits": {
        "train": 5355
      },
      "folds": {
        "fold 1": 5355
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "very low",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "M10",
      "rows": 5355,
      "native_splits": {
        "train": 5355
      },
      "source_parts": {
        "B1": 1785,
        "B2": 1785,
        "B3": 1785
      },
      "source_groups": {
        "dysarthric": 5355
      },
      "research_splits": {
        "excluded_train": 7,
        "train": 5348
      },
      "folds": {
        "fold 4": 5348,
        "—": 7
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "train",
      "original_group": "train",
      "severity_raw": "very low",
      "severity_label": "轻度",
      "severity_key": "mild",
      "severity_rank": 1
    },
    {
      "dataset": "uaspeech",
      "dataset_label": "UA-Speech",
      "speaker_id": "M11",
      "rows": 2846,
      "native_splits": {
        "test": 2846
      },
      "source_parts": {
        "B1": 1530,
        "B2": 1316
      },
      "source_groups": {
        "dysarthric": 2846
      },
      "research_splits": {
        "test": 2846
      },
      "folds": {
        "—": 2846
      },
      "clinical_group": "dysarthric",
      "language": "en",
      "primary_assignment": "test",
      "original_group": "test",
      "severity_raw": "low",
      "severity_label": "中度",
      "severity_key": "moderate",
      "severity_rank": 2
    }
  ],
  "method": {
    "seed": 260905,
    "equivalent_epochs": 3,
    "sampling_candidate_rows": 170011,
    "independent_groups": 135556,
    "draw_rows": 406668,
    "draws_by_dataset": {
      "cdsd": 247547,
      "easycall": 66423,
      "torgo": 36550,
      "uaspeech": 56148
    },
    "hyperparameters": {
      "learning_rate": 0.0001,
      "lora_rank": 16,
      "lora_alpha": 32,
      "lora_dropout": 0.05,
      "weight_decay": 0.01,
      "warmup_ratio": 0.03,
      "lr_scheduler": "linear",
      "effective_batch_size": 32,
      "precision": "BF16",
      "attention": "SDPA"
    },
    "folds": [
      {
        "fold": 0,
        "train_rows": 132537,
        "dev_rows": 37474,
        "draw_rows": 318810,
        "independent_groups": 106270,
        "models": {
          "phi4": {
            "status": "ok",
            "global_step": 9963,
            "best_checkpoint_step": 1500
          },
          "qwen25": {
            "status": "ok",
            "global_step": 9963,
            "best_checkpoint_step": 2500
          },
          "whisper": {
            "status": "ok",
            "global_step": 9963,
            "best_checkpoint_step": 4000
          }
        }
      },
      {
        "fold": 1,
        "train_rows": 133920,
        "dev_rows": 36091,
        "draw_rows": 319389,
        "independent_groups": 106463,
        "models": {
          "phi4": {
            "status": "ok",
            "global_step": 9981,
            "best_checkpoint_step": 2000
          },
          "qwen25": {
            "status": "ok",
            "global_step": 9981,
            "best_checkpoint_step": 1500
          },
          "whisper": {
            "status": "ok",
            "global_step": 9981,
            "best_checkpoint_step": 4000
          }
        }
      },
      {
        "fold": 2,
        "train_rows": 137079,
        "dev_rows": 32932,
        "draw_rows": 322752,
        "independent_groups": 107584,
        "models": {
          "phi4": {
            "status": "ok",
            "global_step": 10086,
            "best_checkpoint_step": 4000
          },
          "qwen25": {
            "status": "ok",
            "global_step": 10086,
            "best_checkpoint_step": 1500
          },
          "whisper": {
            "status": "ok",
            "global_step": 10086,
            "best_checkpoint_step": 3500
          }
        }
      },
      {
        "fold": 3,
        "train_rows": 136805,
        "dev_rows": 33206,
        "draw_rows": 321549,
        "independent_groups": 107183,
        "models": {
          "phi4": {
            "status": "ok",
            "global_step": 10049,
            "best_checkpoint_step": 2000
          },
          "qwen25": {
            "status": "ok",
            "global_step": 10049,
            "best_checkpoint_step": 1000
          },
          "whisper": {
            "status": "ok",
            "global_step": 10049,
            "best_checkpoint_step": 4000
          }
        }
      },
      {
        "fold": 4,
        "train_rows": 131323,
        "dev_rows": 38688,
        "draw_rows": 319032,
        "independent_groups": 106344,
        "models": {
          "phi4": {
            "status": "ok",
            "global_step": 9970,
            "best_checkpoint_step": 1500
          },
          "qwen25": {
            "status": "ok",
            "global_step": 9970,
            "best_checkpoint_step": 1000
          },
          "whisper": {
            "status": "ok",
            "global_step": 9970,
            "best_checkpoint_step": 3500
          }
        }
      }
    ],
    "final_receipts": {
      "phi4": {
        "status": "ok",
        "global_step": 12709
      },
      "qwen25": {
        "status": "ok",
        "global_step": 12709
      },
      "whisper": {
        "status": "ok",
        "global_step": 12709
      }
    }
  },
  "performance": [
    {
      "id": "phi4",
      "label": "Phi-4 Multimodal",
      "cohorts": {
        "disease": {
          "scopes": {
            "ALL": {
              "scope": "ALL",
              "label": "全部测试集",
              "severities": [
                {
                  "raw": "1",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 1656,
                  "wer": {
                    "before": 1.2382575757575758,
                    "after": 0.08598484848484848,
                    "delta": -1.1522727272727273
                  },
                  "cer": {
                    "before": 0.7157181571815718,
                    "after": 0.040040650406504064,
                    "delta": -0.6756775067750678
                  },
                  "ser": {
                    "before": 0.7427536231884058,
                    "after": 0.11654589371980677,
                    "delta": -0.626207729468599
                  },
                  "exact_match_rate": {
                    "before": 0.2572463768115942,
                    "after": 0.8834541062801933,
                    "delta": 0.626207729468599
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8912478948848835,
                    "after": 0.9870347212550145,
                    "delta": 0.09578682637013092
                  },
                  "repetition_rate": {
                    "before": 0.0024154589371980675,
                    "after": 0.0,
                    "delta": -0.0024154589371980675
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 1394.0,
                      "after": 186.0,
                      "delta": -1208.0,
                      "before_rate": 0.5280303030303031,
                      "after_rate": 0.07045454545454545
                    },
                    "deletions": {
                      "before": 128.0,
                      "after": 28.0,
                      "delta": -100.0,
                      "before_rate": 0.048484848484848485,
                      "after_rate": 0.010606060606060607
                    },
                    "insertions": {
                      "before": 1747.0,
                      "after": 13.0,
                      "delta": -1734.0,
                      "before_rate": 0.6617424242424242,
                      "after_rate": 0.004924242424242424
                    },
                    "reference_tokens": {
                      "before": 2640.0,
                      "after": 2640.0
                    }
                  }
                },
                {
                  "raw": "mild",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 810,
                  "wer": {
                    "before": 0.09328726554787758,
                    "after": 0.032082922013820334,
                    "delta": -0.06120434353405725
                  },
                  "cer": {
                    "before": 0.04159677960415968,
                    "after": 0.01755563010175556,
                    "delta": -0.02404114950240412
                  },
                  "ser": {
                    "before": 0.19135802469135801,
                    "after": 0.07160493827160494,
                    "delta": -0.11975308641975307
                  },
                  "exact_match_rate": {
                    "before": 0.808641975308642,
                    "after": 0.928395061728395,
                    "delta": 0.11975308641975302
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.9806600397015796,
                    "after": 0.9911920674789099,
                    "delta": 0.01053202777733031
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 147.0,
                      "after": 57.0,
                      "delta": -90.0,
                      "before_rate": 0.07255676209279369,
                      "after_rate": 0.02813425468904245
                    },
                    "deletions": {
                      "before": 3.0,
                      "after": 2.0,
                      "delta": -1.0,
                      "before_rate": 0.0014807502467917078,
                      "after_rate": 0.0009871668311944718
                    },
                    "insertions": {
                      "before": 39.0,
                      "after": 6.0,
                      "delta": -33.0,
                      "before_rate": 0.0192497532082922,
                      "after_rate": 0.0029615004935834156
                    },
                    "reference_tokens": {
                      "before": 2026.0,
                      "after": 2026.0
                    }
                  }
                },
                {
                  "raw": "very low",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 10710,
                  "wer": {
                    "before": 0.7804855275443511,
                    "after": 0.10802987861811392,
                    "delta": -0.6724556489262372
                  },
                  "cer": {
                    "before": 0.4161788367395844,
                    "after": 0.07533121084522953,
                    "delta": -0.34084762589435486
                  },
                  "ser": {
                    "before": 0.45443510737628384,
                    "after": 0.10784313725490197,
                    "delta": -0.3465919701213819
                  },
                  "exact_match_rate": {
                    "before": 0.5455648926237161,
                    "after": 0.8921568627450981,
                    "delta": 0.346591970121382
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.9381711134723588,
                    "after": 0.9844184714205125,
                    "delta": 0.04624735794815371
                  },
                  "repetition_rate": {
                    "before": 0.0009337068160597573,
                    "after": 0.0,
                    "delta": -0.0009337068160597573
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 4645.0,
                      "after": 1148.0,
                      "delta": -3497.0,
                      "before_rate": 0.43370681605975725,
                      "after_rate": 0.10718954248366012
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 3714.0,
                      "after": 9.0,
                      "delta": -3705.0,
                      "before_rate": 0.3467787114845938,
                      "after_rate": 0.0008403361344537816
                    },
                    "reference_tokens": {
                      "before": 10710.0,
                      "after": 10710.0
                    }
                  }
                },
                {
                  "raw": "2",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 413,
                  "wer": {
                    "before": 2.0121396054628224,
                    "after": 0.496206373292868,
                    "delta": -1.5159332321699543
                  },
                  "cer": {
                    "before": 1.2710990502035278,
                    "after": 0.3649932157394844,
                    "delta": -0.9061058344640434
                  },
                  "ser": {
                    "before": 0.9757869249394673,
                    "after": 0.44552058111380144,
                    "delta": -0.5302663438256658
                  },
                  "exact_match_rate": {
                    "before": 0.024213075060532687,
                    "after": 0.5544794188861986,
                    "delta": 0.5302663438256658
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8136672417996293,
                    "after": 0.9315914905677407,
                    "delta": 0.11792424876811136
                  },
                  "repetition_rate": {
                    "before": 0.004842615012106538,
                    "after": 0.0,
                    "delta": -0.004842615012106538
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 552.0,
                      "after": 203.0,
                      "delta": -349.0,
                      "before_rate": 0.8376327769347496,
                      "after_rate": 0.30804248861911987
                    },
                    "deletions": {
                      "before": 76.0,
                      "after": 109.0,
                      "delta": 33.0,
                      "before_rate": 0.11532625189681335,
                      "after_rate": 0.165402124430956
                    },
                    "insertions": {
                      "before": 698.0,
                      "after": 15.0,
                      "delta": -683.0,
                      "before_rate": 1.0591805766312594,
                      "after_rate": 0.02276176024279211
                    },
                    "reference_tokens": {
                      "before": 659.0,
                      "after": 659.0
                    }
                  }
                },
                {
                  "raw": "low",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 2846,
                  "wer": {
                    "before": 1.1387912860154603,
                    "after": 0.33274771609276177,
                    "delta": -0.8060435699226985
                  },
                  "cer": {
                    "before": 0.7214677461478193,
                    "after": 0.3032776181770697,
                    "delta": -0.41819012797074956
                  },
                  "ser": {
                    "before": 0.859100491918482,
                    "after": 0.3320449754040759,
                    "delta": -0.5270555165144062
                  },
                  "exact_match_rate": {
                    "before": 0.1408995080815179,
                    "after": 0.6679550245959242,
                    "delta": 0.5270555165144062
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8517227258090813,
                    "after": 0.9484472931771738,
                    "delta": 0.09672456736809254
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 2442.0,
                      "after": 945.0,
                      "delta": -1497.0,
                      "before_rate": 0.8580463808854533,
                      "after_rate": 0.3320449754040759
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 799.0,
                      "after": 2.0,
                      "delta": -797.0,
                      "before_rate": 0.28074490513000705,
                      "after_rate": 0.0007027406886858749
                    },
                    "reference_tokens": {
                      "before": 2846.0,
                      "after": 2846.0
                    }
                  }
                },
                {
                  "raw": "3",
                  "label": "重度",
                  "key": "severe",
                  "rank": 3,
                  "n": 414,
                  "wer": {
                    "before": 4.175757575757576,
                    "after": 0.7712121212121212,
                    "delta": -3.4045454545454543
                  },
                  "cer": {
                    "before": 2.919783197831978,
                    "after": 0.6650406504065041,
                    "delta": -2.254742547425474
                  },
                  "ser": {
                    "before": 0.9951690821256038,
                    "after": 0.644927536231884,
                    "delta": -0.3502415458937198
                  },
                  "exact_match_rate": {
                    "before": 0.004830917874396135,
                    "after": 0.35507246376811596,
                    "delta": 0.3502415458937198
                  },
                  "empty_output_rate": {
                    "before": 0.0024154589371980675,
                    "after": 0.0,
                    "delta": -0.0024154589371980675
                  },
                  "semscore": {
                    "before": 0.7810425284692055,
                    "after": 0.8872514175620057,
                    "delta": 0.10620888909280013
                  },
                  "repetition_rate": {
                    "before": 0.016908212560386472,
                    "after": 0.0024154589371980675,
                    "delta": -0.014492753623188404
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 528.0,
                      "after": 304.0,
                      "delta": -224.0,
                      "before_rate": 0.8,
                      "after_rate": 0.46060606060606063
                    },
                    "deletions": {
                      "before": 128.0,
                      "after": 85.0,
                      "delta": -43.0,
                      "before_rate": 0.19393939393939394,
                      "after_rate": 0.12878787878787878
                    },
                    "insertions": {
                      "before": 2100.0,
                      "after": 120.0,
                      "delta": -1980.0,
                      "before_rate": 3.1818181818181817,
                      "after_rate": 0.18181818181818182
                    },
                    "reference_tokens": {
                      "before": 660.0,
                      "after": 660.0
                    }
                  }
                },
                {
                  "raw": "high",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 5184,
                  "wer": {
                    "before": 1.4834104938271604,
                    "after": 0.8591820987654321,
                    "delta": -0.6242283950617283
                  },
                  "cer": {
                    "before": 1.2736025392347028,
                    "after": 0.8362898959619115,
                    "delta": -0.4373126432727913
                  },
                  "ser": {
                    "before": 0.9926697530864198,
                    "after": 0.8524305555555556,
                    "delta": -0.14023919753086422
                  },
                  "exact_match_rate": {
                    "before": 0.0073302469135802465,
                    "after": 0.14756944444444445,
                    "delta": 0.1402391975308642
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8013476071718298,
                    "after": 0.8602996318037679,
                    "delta": 0.05895202463193805
                  },
                  "repetition_rate": {
                    "before": 0.005015432098765432,
                    "after": 0.0,
                    "delta": -0.005015432098765432
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 5144.0,
                      "after": 4419.0,
                      "delta": -725.0,
                      "before_rate": 0.9922839506172839,
                      "after_rate": 0.8524305555555556
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 2546.0,
                      "after": 35.0,
                      "delta": -2511.0,
                      "before_rate": 0.49112654320987653,
                      "after_rate": 0.006751543209876543
                    },
                    "reference_tokens": {
                      "before": 5184.0,
                      "after": 5184.0
                    }
                  }
                },
                {
                  "raw": "severe",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 236,
                  "wer": {
                    "before": 0.9663120567375887,
                    "after": 0.5921985815602837,
                    "delta": -0.374113475177305
                  },
                  "cer": {
                    "before": 0.6358603066439523,
                    "after": 0.454855195911414,
                    "delta": -0.18100511073253833
                  },
                  "ser": {
                    "before": 0.8983050847457628,
                    "after": 0.7288135593220338,
                    "delta": -0.16949152542372892
                  },
                  "exact_match_rate": {
                    "before": 0.1016949152542373,
                    "after": 0.2711864406779661,
                    "delta": 0.1694915254237288
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8527643453266661,
                    "after": 0.8958113751674103,
                    "delta": 0.043047029840744155
                  },
                  "repetition_rate": {
                    "before": 0.00423728813559322,
                    "after": 0.0,
                    "delta": -0.00423728813559322
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 347.0,
                      "after": 276.0,
                      "delta": -71.0,
                      "before_rate": 0.6152482269503546,
                      "after_rate": 0.48936170212765956
                    },
                    "deletions": {
                      "before": 46.0,
                      "after": 33.0,
                      "delta": -13.0,
                      "before_rate": 0.08156028368794327,
                      "after_rate": 0.05851063829787234
                    },
                    "insertions": {
                      "before": 152.0,
                      "after": 25.0,
                      "delta": -127.0,
                      "before_rate": 0.2695035460992908,
                      "after_rate": 0.044326241134751775
                    },
                    "reference_tokens": {
                      "before": 564.0,
                      "after": 564.0
                    }
                  }
                },
                {
                  "raw": "N/A",
                  "label": "未标注",
                  "key": "unknown",
                  "rank": null,
                  "n": 234,
                  "wer": {
                    "before": 1.8695652173913044,
                    "after": 0.2289855072463768,
                    "delta": -1.6405797101449275
                  },
                  "cer": {
                    "before": 1.2133599202392822,
                    "after": 0.1485543369890329,
                    "delta": -1.0648055832502492
                  },
                  "ser": {
                    "before": 0.9358974358974359,
                    "after": 0.23931623931623933,
                    "delta": -0.6965811965811965
                  },
                  "exact_match_rate": {
                    "before": 0.0641025641025641,
                    "after": 0.7606837606837606,
                    "delta": 0.6965811965811965
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8373601459539853,
                    "after": 0.9642741575709775,
                    "delta": 0.12691401161699212
                  },
                  "repetition_rate": {
                    "before": 0.008547008547008548,
                    "after": 0.0,
                    "delta": -0.008547008547008548
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 267.0,
                      "after": 62.0,
                      "delta": -205.0,
                      "before_rate": 0.7739130434782608,
                      "after_rate": 0.17971014492753623
                    },
                    "deletions": {
                      "before": 22.0,
                      "after": 3.0,
                      "delta": -19.0,
                      "before_rate": 0.06376811594202898,
                      "after_rate": 0.008695652173913044
                    },
                    "insertions": {
                      "before": 356.0,
                      "after": 14.0,
                      "delta": -342.0,
                      "before_rate": 1.0318840579710145,
                      "after_rate": 0.04057971014492753
                    },
                    "reference_tokens": {
                      "before": 345.0,
                      "after": 345.0
                    }
                  }
                }
              ],
              "n": 52073,
              "wer": {
                "before": 0.9865976957441805,
                "after": 0.7225418735563823,
                "delta": -0.2640558221877982
              },
              "cer": {
                "before": 0.7729694882375661,
                "after": 0.5135657845446177,
                "delta": -0.2594037036929484
              },
              "ser": {
                "before": 0.8041019338236706,
                "after": 0.6168839897835731,
                "delta": -0.1872179440400975
              },
              "exact_match_rate": {
                "before": 0.19589806617632938,
                "after": 0.38311601021642694,
                "delta": 0.18721794404009756
              },
              "empty_output_rate": {
                "before": 1.9203810035911125e-05,
                "after": 0.0,
                "delta": -1.9203810035911125e-05
              },
              "semscore": {
                "before": 0.8791699554510279,
                "after": 0.9158706469203242,
                "delta": 0.03670069146929622
              },
              "repetition_rate": {
                "before": 0.0017475467132679124,
                "after": 0.0005953181111132449,
                "delta": -0.0011522286021546676
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 91598.0,
                  "after": 74397.0,
                  "delta": -17201.0,
                  "before_rate": 0.6334490532634404,
                  "after_rate": 0.5144949585759533
                },
                "deletions": {
                  "before": 7409.0,
                  "after": 9356.0,
                  "delta": 1947.0,
                  "before_rate": 0.05123718897387312,
                  "after_rate": 0.06470173303273814
                },
                "insertions": {
                  "before": 43657.0,
                  "after": 20728.0,
                  "delta": -22929.0,
                  "before_rate": 0.3019114535068671,
                  "after_rate": 0.14334518194769091
                },
                "reference_tokens": {
                  "before": 144602.0,
                  "after": 144602.0
                }
              }
            },
            "cdsd": {
              "scope": "cdsd",
              "label": "CDSD",
              "severities": [],
              "n": 29570,
              "wer": {
                "before": 0.9636540918566338,
                "after": 0.8101506287405017,
                "delta": -0.15350346311613206
              },
              "cer": {
                "before": 0.7947484456133904,
                "after": 0.6680671456336966,
                "delta": -0.1266812999796938
              },
              "ser": {
                "before": 0.9057490700033818,
                "after": 0.8344267839026039,
                "delta": -0.07132228610077784
              },
              "exact_match_rate": {
                "before": 0.09425092999661819,
                "after": 0.165573216097396,
                "delta": 0.07132228610077782
              },
              "empty_output_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "semscore": {
                "before": 0.8734590330839883,
                "after": 0.8915596887917788,
                "delta": 0.018100655707790514
              },
              "repetition_rate": {
                "before": 0.0013189042948934732,
                "after": 0.0010145417653026716,
                "delta": -0.00030436252959080163
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 76132.0,
                  "after": 66797.0,
                  "delta": -9335.0,
                  "before_rate": 0.639936789724968,
                  "after_rate": 0.561470311344227
                },
                "deletions": {
                  "before": 7006.0,
                  "after": 9096.0,
                  "delta": 2090.0,
                  "before_rate": 0.058889785488534734,
                  "after_rate": 0.07645753479927375
                },
                "insertions": {
                  "before": 31506.0,
                  "after": 20489.0,
                  "delta": -11017.0,
                  "before_rate": 0.2648275166431309,
                  "after_rate": 0.17222278259700088
                },
                "reference_tokens": {
                  "before": 118968.0,
                  "after": 118968.0
                }
              }
            },
            "easycall": {
              "scope": "easycall",
              "label": "EasyCall",
              "severities": [
                {
                  "raw": "1",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 1656,
                  "wer": {
                    "before": 1.2382575757575758,
                    "after": 0.08598484848484848,
                    "delta": -1.1522727272727273
                  },
                  "cer": {
                    "before": 0.7157181571815718,
                    "after": 0.040040650406504064,
                    "delta": -0.6756775067750678
                  },
                  "ser": {
                    "before": 0.7427536231884058,
                    "after": 0.11654589371980677,
                    "delta": -0.626207729468599
                  },
                  "exact_match_rate": {
                    "before": 0.2572463768115942,
                    "after": 0.8834541062801933,
                    "delta": 0.626207729468599
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8912478948848835,
                    "after": 0.9870347212550145,
                    "delta": 0.09578682637013092
                  },
                  "repetition_rate": {
                    "before": 0.0024154589371980675,
                    "after": 0.0,
                    "delta": -0.0024154589371980675
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 1394.0,
                      "after": 186.0,
                      "delta": -1208.0,
                      "before_rate": 0.5280303030303031,
                      "after_rate": 0.07045454545454545
                    },
                    "deletions": {
                      "before": 128.0,
                      "after": 28.0,
                      "delta": -100.0,
                      "before_rate": 0.048484848484848485,
                      "after_rate": 0.010606060606060607
                    },
                    "insertions": {
                      "before": 1747.0,
                      "after": 13.0,
                      "delta": -1734.0,
                      "before_rate": 0.6617424242424242,
                      "after_rate": 0.004924242424242424
                    },
                    "reference_tokens": {
                      "before": 2640.0,
                      "after": 2640.0
                    }
                  }
                },
                {
                  "raw": "2",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 413,
                  "wer": {
                    "before": 2.0121396054628224,
                    "after": 0.496206373292868,
                    "delta": -1.5159332321699543
                  },
                  "cer": {
                    "before": 1.2710990502035278,
                    "after": 0.3649932157394844,
                    "delta": -0.9061058344640434
                  },
                  "ser": {
                    "before": 0.9757869249394673,
                    "after": 0.44552058111380144,
                    "delta": -0.5302663438256658
                  },
                  "exact_match_rate": {
                    "before": 0.024213075060532687,
                    "after": 0.5544794188861986,
                    "delta": 0.5302663438256658
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8136672417996293,
                    "after": 0.9315914905677407,
                    "delta": 0.11792424876811136
                  },
                  "repetition_rate": {
                    "before": 0.004842615012106538,
                    "after": 0.0,
                    "delta": -0.004842615012106538
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 552.0,
                      "after": 203.0,
                      "delta": -349.0,
                      "before_rate": 0.8376327769347496,
                      "after_rate": 0.30804248861911987
                    },
                    "deletions": {
                      "before": 76.0,
                      "after": 109.0,
                      "delta": 33.0,
                      "before_rate": 0.11532625189681335,
                      "after_rate": 0.165402124430956
                    },
                    "insertions": {
                      "before": 698.0,
                      "after": 15.0,
                      "delta": -683.0,
                      "before_rate": 1.0591805766312594,
                      "after_rate": 0.02276176024279211
                    },
                    "reference_tokens": {
                      "before": 659.0,
                      "after": 659.0
                    }
                  }
                },
                {
                  "raw": "3",
                  "label": "重度",
                  "key": "severe",
                  "rank": 3,
                  "n": 414,
                  "wer": {
                    "before": 4.175757575757576,
                    "after": 0.7712121212121212,
                    "delta": -3.4045454545454543
                  },
                  "cer": {
                    "before": 2.919783197831978,
                    "after": 0.6650406504065041,
                    "delta": -2.254742547425474
                  },
                  "ser": {
                    "before": 0.9951690821256038,
                    "after": 0.644927536231884,
                    "delta": -0.3502415458937198
                  },
                  "exact_match_rate": {
                    "before": 0.004830917874396135,
                    "after": 0.35507246376811596,
                    "delta": 0.3502415458937198
                  },
                  "empty_output_rate": {
                    "before": 0.0024154589371980675,
                    "after": 0.0,
                    "delta": -0.0024154589371980675
                  },
                  "semscore": {
                    "before": 0.7810425284692055,
                    "after": 0.8872514175620057,
                    "delta": 0.10620888909280013
                  },
                  "repetition_rate": {
                    "before": 0.016908212560386472,
                    "after": 0.0024154589371980675,
                    "delta": -0.014492753623188404
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 528.0,
                      "after": 304.0,
                      "delta": -224.0,
                      "before_rate": 0.8,
                      "after_rate": 0.46060606060606063
                    },
                    "deletions": {
                      "before": 128.0,
                      "after": 85.0,
                      "delta": -43.0,
                      "before_rate": 0.19393939393939394,
                      "after_rate": 0.12878787878787878
                    },
                    "insertions": {
                      "before": 2100.0,
                      "after": 120.0,
                      "delta": -1980.0,
                      "before_rate": 3.1818181818181817,
                      "after_rate": 0.18181818181818182
                    },
                    "reference_tokens": {
                      "before": 660.0,
                      "after": 660.0
                    }
                  }
                },
                {
                  "raw": "N/A",
                  "label": "未标注",
                  "key": "unknown",
                  "rank": null,
                  "n": 234,
                  "wer": {
                    "before": 1.8695652173913044,
                    "after": 0.2289855072463768,
                    "delta": -1.6405797101449275
                  },
                  "cer": {
                    "before": 1.2133599202392822,
                    "after": 0.1485543369890329,
                    "delta": -1.0648055832502492
                  },
                  "ser": {
                    "before": 0.9358974358974359,
                    "after": 0.23931623931623933,
                    "delta": -0.6965811965811965
                  },
                  "exact_match_rate": {
                    "before": 0.0641025641025641,
                    "after": 0.7606837606837606,
                    "delta": 0.6965811965811965
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8373601459539853,
                    "after": 0.9642741575709775,
                    "delta": 0.12691401161699212
                  },
                  "repetition_rate": {
                    "before": 0.008547008547008548,
                    "after": 0.0,
                    "delta": -0.008547008547008548
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 267.0,
                      "after": 62.0,
                      "delta": -205.0,
                      "before_rate": 0.7739130434782608,
                      "after_rate": 0.17971014492753623
                    },
                    "deletions": {
                      "before": 22.0,
                      "after": 3.0,
                      "delta": -19.0,
                      "before_rate": 0.06376811594202898,
                      "after_rate": 0.008695652173913044
                    },
                    "insertions": {
                      "before": 356.0,
                      "after": 14.0,
                      "delta": -342.0,
                      "before_rate": 1.0318840579710145,
                      "after_rate": 0.04057971014492753
                    },
                    "reference_tokens": {
                      "before": 345.0,
                      "after": 345.0
                    }
                  }
                }
              ],
              "n": 2717,
              "wer": {
                "before": 1.8578066914498141,
                "after": 0.2653345724907063,
                "delta": -1.5924721189591078
              },
              "cer": {
                "before": 1.1787415600016569,
                "after": 0.19419245267387433,
                "delta": -0.9845491073277826
              },
              "ser": {
                "before": 0.833271991166728,
                "after": 0.2576370997423629,
                "delta": -0.5756348914243652
              },
              "exact_match_rate": {
                "before": 0.166728008833272,
                "after": 0.7423629002576371,
                "delta": 0.5756348914243651
              },
              "empty_output_rate": {
                "before": 0.000368052999631947,
                "after": 0.0,
                "delta": -0.000368052999631947
              },
              "semscore": {
                "before": 0.858021702514574,
                "after": 0.9614424084449982,
                "delta": 0.10342070593042418
              },
              "repetition_rate": {
                "before": 0.005520794994479205,
                "after": 0.000368052999631947,
                "delta": -0.005152741994847257
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 2741.0,
                  "after": 755.0,
                  "delta": -1986.0,
                  "before_rate": 0.6368494423791822,
                  "after_rate": 0.1754182156133829
                },
                "deletions": {
                  "before": 354.0,
                  "after": 225.0,
                  "delta": -129.0,
                  "before_rate": 0.08224907063197026,
                  "after_rate": 0.052276951672862455
                },
                "insertions": {
                  "before": 4901.0,
                  "after": 162.0,
                  "delta": -4739.0,
                  "before_rate": 1.1387081784386617,
                  "after_rate": 0.03763940520446097
                },
                "reference_tokens": {
                  "before": 4304.0,
                  "after": 4304.0
                }
              }
            },
            "torgo": {
              "scope": "torgo",
              "label": "TORGO",
              "severities": [
                {
                  "raw": "mild",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 810,
                  "wer": {
                    "before": 0.09328726554787758,
                    "after": 0.032082922013820334,
                    "delta": -0.06120434353405725
                  },
                  "cer": {
                    "before": 0.04159677960415968,
                    "after": 0.01755563010175556,
                    "delta": -0.02404114950240412
                  },
                  "ser": {
                    "before": 0.19135802469135801,
                    "after": 0.07160493827160494,
                    "delta": -0.11975308641975307
                  },
                  "exact_match_rate": {
                    "before": 0.808641975308642,
                    "after": 0.928395061728395,
                    "delta": 0.11975308641975302
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.9806600397015796,
                    "after": 0.9911920674789099,
                    "delta": 0.01053202777733031
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 147.0,
                      "after": 57.0,
                      "delta": -90.0,
                      "before_rate": 0.07255676209279369,
                      "after_rate": 0.02813425468904245
                    },
                    "deletions": {
                      "before": 3.0,
                      "after": 2.0,
                      "delta": -1.0,
                      "before_rate": 0.0014807502467917078,
                      "after_rate": 0.0009871668311944718
                    },
                    "insertions": {
                      "before": 39.0,
                      "after": 6.0,
                      "delta": -33.0,
                      "before_rate": 0.0192497532082922,
                      "after_rate": 0.0029615004935834156
                    },
                    "reference_tokens": {
                      "before": 2026.0,
                      "after": 2026.0
                    }
                  }
                },
                {
                  "raw": "severe",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 236,
                  "wer": {
                    "before": 0.9663120567375887,
                    "after": 0.5921985815602837,
                    "delta": -0.374113475177305
                  },
                  "cer": {
                    "before": 0.6358603066439523,
                    "after": 0.454855195911414,
                    "delta": -0.18100511073253833
                  },
                  "ser": {
                    "before": 0.8983050847457628,
                    "after": 0.7288135593220338,
                    "delta": -0.16949152542372892
                  },
                  "exact_match_rate": {
                    "before": 0.1016949152542373,
                    "after": 0.2711864406779661,
                    "delta": 0.1694915254237288
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8527643453266661,
                    "after": 0.8958113751674103,
                    "delta": 0.043047029840744155
                  },
                  "repetition_rate": {
                    "before": 0.00423728813559322,
                    "after": 0.0,
                    "delta": -0.00423728813559322
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 347.0,
                      "after": 276.0,
                      "delta": -71.0,
                      "before_rate": 0.6152482269503546,
                      "after_rate": 0.48936170212765956
                    },
                    "deletions": {
                      "before": 46.0,
                      "after": 33.0,
                      "delta": -13.0,
                      "before_rate": 0.08156028368794327,
                      "after_rate": 0.05851063829787234
                    },
                    "insertions": {
                      "before": 152.0,
                      "after": 25.0,
                      "delta": -127.0,
                      "before_rate": 0.2695035460992908,
                      "after_rate": 0.044326241134751775
                    },
                    "reference_tokens": {
                      "before": 564.0,
                      "after": 564.0
                    }
                  }
                }
              ],
              "n": 1046,
              "wer": {
                "before": 0.2833976833976834,
                "after": 0.15405405405405406,
                "delta": -0.12934362934362933
              },
              "cer": {
                "before": 0.16517580373749002,
                "after": 0.10849349039057657,
                "delta": -0.056682313346913454
              },
              "ser": {
                "before": 0.3508604206500956,
                "after": 0.2198852772466539,
                "delta": -0.13097514340344169
              },
              "exact_match_rate": {
                "before": 0.6491395793499044,
                "after": 0.780114722753346,
                "delta": 0.13097514340344163
              },
              "empty_output_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "semscore": {
                "before": 0.9518040321753084,
                "after": 0.9696721407241164,
                "delta": 0.017868108548808048
              },
              "repetition_rate": {
                "before": 0.0009560229445506692,
                "after": 0.0,
                "delta": -0.0009560229445506692
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 494.0,
                  "after": 333.0,
                  "delta": -161.0,
                  "before_rate": 0.19073359073359072,
                  "after_rate": 0.12857142857142856
                },
                "deletions": {
                  "before": 49.0,
                  "after": 35.0,
                  "delta": -14.0,
                  "before_rate": 0.01891891891891892,
                  "after_rate": 0.013513513513513514
                },
                "insertions": {
                  "before": 191.0,
                  "after": 31.0,
                  "delta": -160.0,
                  "before_rate": 0.07374517374517374,
                  "after_rate": 0.011969111969111969
                },
                "reference_tokens": {
                  "before": 2590.0,
                  "after": 2590.0
                }
              }
            },
            "uaspeech": {
              "scope": "uaspeech",
              "label": "UA-Speech",
              "severities": [
                {
                  "raw": "very low",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 10710,
                  "wer": {
                    "before": 0.7804855275443511,
                    "after": 0.10802987861811392,
                    "delta": -0.6724556489262372
                  },
                  "cer": {
                    "before": 0.4161788367395844,
                    "after": 0.07533121084522953,
                    "delta": -0.34084762589435486
                  },
                  "ser": {
                    "before": 0.45443510737628384,
                    "after": 0.10784313725490197,
                    "delta": -0.3465919701213819
                  },
                  "exact_match_rate": {
                    "before": 0.5455648926237161,
                    "after": 0.8921568627450981,
                    "delta": 0.346591970121382
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.9381711134723588,
                    "after": 0.9844184714205125,
                    "delta": 0.04624735794815371
                  },
                  "repetition_rate": {
                    "before": 0.0009337068160597573,
                    "after": 0.0,
                    "delta": -0.0009337068160597573
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 4645.0,
                      "after": 1148.0,
                      "delta": -3497.0,
                      "before_rate": 0.43370681605975725,
                      "after_rate": 0.10718954248366012
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 3714.0,
                      "after": 9.0,
                      "delta": -3705.0,
                      "before_rate": 0.3467787114845938,
                      "after_rate": 0.0008403361344537816
                    },
                    "reference_tokens": {
                      "before": 10710.0,
                      "after": 10710.0
                    }
                  }
                },
                {
                  "raw": "low",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 2846,
                  "wer": {
                    "before": 1.1387912860154603,
                    "after": 0.33274771609276177,
                    "delta": -0.8060435699226985
                  },
                  "cer": {
                    "before": 0.7214677461478193,
                    "after": 0.3032776181770697,
                    "delta": -0.41819012797074956
                  },
                  "ser": {
                    "before": 0.859100491918482,
                    "after": 0.3320449754040759,
                    "delta": -0.5270555165144062
                  },
                  "exact_match_rate": {
                    "before": 0.1408995080815179,
                    "after": 0.6679550245959242,
                    "delta": 0.5270555165144062
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8517227258090813,
                    "after": 0.9484472931771738,
                    "delta": 0.09672456736809254
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 2442.0,
                      "after": 945.0,
                      "delta": -1497.0,
                      "before_rate": 0.8580463808854533,
                      "after_rate": 0.3320449754040759
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 799.0,
                      "after": 2.0,
                      "delta": -797.0,
                      "before_rate": 0.28074490513000705,
                      "after_rate": 0.0007027406886858749
                    },
                    "reference_tokens": {
                      "before": 2846.0,
                      "after": 2846.0
                    }
                  }
                },
                {
                  "raw": "high",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 5184,
                  "wer": {
                    "before": 1.4834104938271604,
                    "after": 0.8591820987654321,
                    "delta": -0.6242283950617283
                  },
                  "cer": {
                    "before": 1.2736025392347028,
                    "after": 0.8362898959619115,
                    "delta": -0.4373126432727913
                  },
                  "ser": {
                    "before": 0.9926697530864198,
                    "after": 0.8524305555555556,
                    "delta": -0.14023919753086422
                  },
                  "exact_match_rate": {
                    "before": 0.0073302469135802465,
                    "after": 0.14756944444444445,
                    "delta": 0.1402391975308642
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8013476071718298,
                    "after": 0.8602996318037679,
                    "delta": 0.05895202463193805
                  },
                  "repetition_rate": {
                    "before": 0.005015432098765432,
                    "after": 0.0,
                    "delta": -0.005015432098765432
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 5144.0,
                      "after": 4419.0,
                      "delta": -725.0,
                      "before_rate": 0.9922839506172839,
                      "after_rate": 0.8524305555555556
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 2546.0,
                      "after": 35.0,
                      "delta": -2511.0,
                      "before_rate": 0.49112654320987653,
                      "after_rate": 0.006751543209876543
                    },
                    "reference_tokens": {
                      "before": 5184.0,
                      "after": 5184.0
                    }
                  }
                }
              ],
              "n": 18740,
              "wer": {
                "before": 1.0293489861259337,
                "after": 0.34994663820704375,
                "delta": -0.67940234791889
              },
              "cer": {
                "before": 0.700116560391016,
                "after": 0.32087410498271185,
                "delta": -0.37924245540830415
              },
              "ser": {
                "before": 0.6647812166488793,
                "after": 0.34786552828175027,
                "delta": -0.3169156883671291
              },
              "exact_match_rate": {
                "before": 0.3352187833511206,
                "after": 0.6521344717182498,
                "delta": 0.3169156883671292
              },
              "empty_output_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "semscore": {
                "before": 0.8871932496542355,
                "after": 0.9446209240430448,
                "delta": 0.05742767438880925
              },
              "repetition_rate": {
                "before": 0.00192102454642476,
                "after": 0.0,
                "delta": -0.00192102454642476
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 12231.0,
                  "after": 6512.0,
                  "delta": -5719.0,
                  "before_rate": 0.6526680896478122,
                  "after_rate": 0.34749199573105655
                },
                "deletions": {
                  "before": 0.0,
                  "after": 0.0,
                  "delta": 0.0,
                  "before_rate": 0.0,
                  "after_rate": 0.0
                },
                "insertions": {
                  "before": 7059.0,
                  "after": 46.0,
                  "delta": -7013.0,
                  "before_rate": 0.37668089647812164,
                  "after_rate": 0.002454642475987193
                },
                "reference_tokens": {
                  "before": 18740.0,
                  "after": 18740.0
                }
              }
            }
          },
          "id": "phi4",
          "label": "Phi-4 Multimodal",
          "cohort": "disease",
          "cohort_label": "疾病组"
        }
      }
    },
    {
      "id": "qwen25",
      "label": "Qwen2.5-Omni-7B",
      "cohorts": {
        "disease": {
          "scopes": {
            "ALL": {
              "scope": "ALL",
              "label": "全部测试集",
              "severities": [
                {
                  "raw": "1",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 1656,
                  "wer": {
                    "before": 1.4079545454545455,
                    "after": 0.07045454545454545,
                    "delta": -1.3375
                  },
                  "cer": {
                    "before": 0.7938346883468834,
                    "after": 0.036246612466124664,
                    "delta": -0.7575880758807587
                  },
                  "ser": {
                    "before": 0.8158212560386473,
                    "after": 0.09480676328502416,
                    "delta": -0.7210144927536232
                  },
                  "exact_match_rate": {
                    "before": 0.18417874396135267,
                    "after": 0.9051932367149759,
                    "delta": 0.7210144927536232
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8760912077510414,
                    "after": 0.9887142688539869,
                    "delta": 0.11262306110294551
                  },
                  "repetition_rate": {
                    "before": 0.004830917874396135,
                    "after": 0.0,
                    "delta": -0.004830917874396135
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 1733.0,
                      "after": 162.0,
                      "delta": -1571.0,
                      "before_rate": 0.656439393939394,
                      "after_rate": 0.06136363636363636
                    },
                    "deletions": {
                      "before": 159.0,
                      "after": 11.0,
                      "delta": -148.0,
                      "before_rate": 0.060227272727272727,
                      "after_rate": 0.004166666666666667
                    },
                    "insertions": {
                      "before": 1825.0,
                      "after": 13.0,
                      "delta": -1812.0,
                      "before_rate": 0.6912878787878788,
                      "after_rate": 0.004924242424242424
                    },
                    "reference_tokens": {
                      "before": 2640.0,
                      "after": 2640.0
                    }
                  }
                },
                {
                  "raw": "mild",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 810,
                  "wer": {
                    "before": 0.07058242843040474,
                    "after": 0.029615004935834157,
                    "delta": -0.04096742349457058
                  },
                  "cer": {
                    "before": 0.033322151403332216,
                    "after": 0.020015654702001565,
                    "delta": -0.01330649670133065
                  },
                  "ser": {
                    "before": 0.1506172839506173,
                    "after": 0.05925925925925926,
                    "delta": -0.09135802469135804
                  },
                  "exact_match_rate": {
                    "before": 0.8493827160493828,
                    "after": 0.9407407407407408,
                    "delta": 0.09135802469135801
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.9825345976117217,
                    "after": 0.9934291501104096,
                    "delta": 0.01089455249868787
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 117.0,
                      "after": 44.0,
                      "delta": -73.0,
                      "before_rate": 0.057749259624876606,
                      "after_rate": 0.02171767028627838
                    },
                    "deletions": {
                      "before": 4.0,
                      "after": 14.0,
                      "delta": 10.0,
                      "before_rate": 0.0019743336623889436,
                      "after_rate": 0.006910167818361303
                    },
                    "insertions": {
                      "before": 22.0,
                      "after": 2.0,
                      "delta": -20.0,
                      "before_rate": 0.01085883514313919,
                      "after_rate": 0.0009871668311944718
                    },
                    "reference_tokens": {
                      "before": 2026.0,
                      "after": 2026.0
                    }
                  }
                },
                {
                  "raw": "very low",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 10710,
                  "wer": {
                    "before": 0.35191409897292253,
                    "after": 0.05163398692810457,
                    "delta": -0.30028011204481797
                  },
                  "cer": {
                    "before": 0.16909725788230462,
                    "after": 0.028259902091677794,
                    "delta": -0.14083735579062684
                  },
                  "ser": {
                    "before": 0.24715219421101775,
                    "after": 0.05163398692810457,
                    "delta": -0.1955182072829132
                  },
                  "exact_match_rate": {
                    "before": 0.7528478057889822,
                    "after": 0.9483660130718954,
                    "delta": 0.19551820728291314
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.9683619010459587,
                    "after": 0.9929312686960237,
                    "delta": 0.02456936765006501
                  },
                  "repetition_rate": {
                    "before": 9.337068160597572e-05,
                    "after": 0.0,
                    "delta": -9.337068160597572e-05
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 2568.0,
                      "after": 552.0,
                      "delta": -2016.0,
                      "before_rate": 0.23977591036414567,
                      "after_rate": 0.0515406162464986
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 1201.0,
                      "after": 1.0,
                      "delta": -1200.0,
                      "before_rate": 0.11213818860877685,
                      "after_rate": 9.337068160597572e-05
                    },
                    "reference_tokens": {
                      "before": 10710.0,
                      "after": 10710.0
                    }
                  }
                },
                {
                  "raw": "2",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 413,
                  "wer": {
                    "before": 1.5493171471927163,
                    "after": 0.4279210925644917,
                    "delta": -1.1213960546282247
                  },
                  "cer": {
                    "before": 1.04640434192673,
                    "after": 0.3226594301221167,
                    "delta": -0.7237449118046133
                  },
                  "ser": {
                    "before": 0.9806295399515739,
                    "after": 0.3728813559322034,
                    "delta": -0.6077481840193705
                  },
                  "exact_match_rate": {
                    "before": 0.01937046004842615,
                    "after": 0.6271186440677966,
                    "delta": 0.6077481840193705
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.821089870704577,
                    "after": 0.9430401065447718,
                    "delta": 0.12195023584019482
                  },
                  "repetition_rate": {
                    "before": 0.004842615012106538,
                    "after": 0.0,
                    "delta": -0.004842615012106538
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 581.0,
                      "after": 177.0,
                      "delta": -404.0,
                      "before_rate": 0.881638846737481,
                      "after_rate": 0.26858877086494687
                    },
                    "deletions": {
                      "before": 66.0,
                      "after": 90.0,
                      "delta": 24.0,
                      "before_rate": 0.10015174506828528,
                      "after_rate": 0.13657056145675264
                    },
                    "insertions": {
                      "before": 374.0,
                      "after": 15.0,
                      "delta": -359.0,
                      "before_rate": 0.56752655538695,
                      "after_rate": 0.02276176024279211
                    },
                    "reference_tokens": {
                      "before": 659.0,
                      "after": 659.0
                    }
                  }
                },
                {
                  "raw": "low",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 2846,
                  "wer": {
                    "before": 0.9511595221363317,
                    "after": 0.26423049894588896,
                    "delta": -0.6869290231904428
                  },
                  "cer": {
                    "before": 0.6175241577435362,
                    "after": 0.22786628362496736,
                    "delta": -0.38965787411856884
                  },
                  "ser": {
                    "before": 0.7217146872803936,
                    "after": 0.26423049894588896,
                    "delta": -0.4574841883345046
                  },
                  "exact_match_rate": {
                    "before": 0.2782853127196065,
                    "after": 0.735769501054111,
                    "delta": 0.4574841883345045
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8845664654201969,
                    "after": 0.9591467008151726,
                    "delta": 0.07458023539497571
                  },
                  "repetition_rate": {
                    "before": 0.00035137034434293746,
                    "after": 0.0,
                    "delta": -0.00035137034434293746
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 2054.0,
                      "after": 752.0,
                      "delta": -1302.0,
                      "before_rate": 0.7217146872803936,
                      "after_rate": 0.26423049894588896
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 653.0,
                      "after": 0.0,
                      "delta": -653.0,
                      "before_rate": 0.22944483485593817,
                      "after_rate": 0.0
                    },
                    "reference_tokens": {
                      "before": 2846.0,
                      "after": 2846.0
                    }
                  }
                },
                {
                  "raw": "3",
                  "label": "重度",
                  "key": "severe",
                  "rank": 3,
                  "n": 414,
                  "wer": {
                    "before": 7.174242424242424,
                    "after": 0.6909090909090909,
                    "delta": -6.4833333333333325
                  },
                  "cer": {
                    "before": 3.6344173441734418,
                    "after": 0.5818428184281843,
                    "delta": -3.0525745257452574
                  },
                  "ser": {
                    "before": 0.9903381642512077,
                    "after": 0.6231884057971014,
                    "delta": -0.36714975845410625
                  },
                  "exact_match_rate": {
                    "before": 0.007246376811594203,
                    "after": 0.37681159420289856,
                    "delta": 0.3695652173913044
                  },
                  "empty_output_rate": {
                    "before": 0.0024154589371980675,
                    "after": 0.0,
                    "delta": -0.0024154589371980675
                  },
                  "semscore": {
                    "before": 0.8031966436573149,
                    "after": 0.8918322883366386,
                    "delta": 0.08863564467932372
                  },
                  "repetition_rate": {
                    "before": 0.07246376811594203,
                    "after": 0.0024154589371980675,
                    "delta": -0.07004830917874397
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 578.0,
                      "after": 285.0,
                      "delta": -293.0,
                      "before_rate": 0.8757575757575757,
                      "after_rate": 0.4318181818181818
                    },
                    "deletions": {
                      "before": 75.0,
                      "after": 106.0,
                      "delta": 31.0,
                      "before_rate": 0.11363636363636363,
                      "after_rate": 0.1606060606060606
                    },
                    "insertions": {
                      "before": 4082.0,
                      "after": 65.0,
                      "delta": -4017.0,
                      "before_rate": 6.184848484848485,
                      "after_rate": 0.09848484848484848
                    },
                    "reference_tokens": {
                      "before": 660.0,
                      "after": 660.0
                    }
                  }
                },
                {
                  "raw": "high",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 5184,
                  "wer": {
                    "before": 1.2166280864197532,
                    "after": 0.8645833333333334,
                    "delta": -0.3520447530864198
                  },
                  "cer": {
                    "before": 1.1287956268735673,
                    "after": 0.8473990477869864,
                    "delta": -0.2813965790865809
                  },
                  "ser": {
                    "before": 0.9791666666666666,
                    "after": 0.8599537037037037,
                    "delta": -0.11921296296296291
                  },
                  "exact_match_rate": {
                    "before": 0.020833333333333332,
                    "after": 0.1400462962962963,
                    "delta": 0.11921296296296298
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.00019290123456790122,
                    "delta": 0.00019290123456790122
                  },
                  "semscore": {
                    "before": 0.8262890770824419,
                    "after": 0.8593914412123002,
                    "delta": 0.03310236412985823
                  },
                  "repetition_rate": {
                    "before": 0.005015432098765432,
                    "after": 0.0,
                    "delta": -0.005015432098765432
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 5076.0,
                      "after": 4457.0,
                      "delta": -619.0,
                      "before_rate": 0.9791666666666666,
                      "after_rate": 0.8597608024691358
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 1.0,
                      "delta": 1.0,
                      "before_rate": 0.0,
                      "after_rate": 0.00019290123456790122
                    },
                    "insertions": {
                      "before": 1231.0,
                      "after": 24.0,
                      "delta": -1207.0,
                      "before_rate": 0.23746141975308643,
                      "after_rate": 0.004629629629629629
                    },
                    "reference_tokens": {
                      "before": 5184.0,
                      "after": 5184.0
                    }
                  }
                },
                {
                  "raw": "severe",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 236,
                  "wer": {
                    "before": 0.7783687943262412,
                    "after": 0.4432624113475177,
                    "delta": -0.33510638297872347
                  },
                  "cer": {
                    "before": 0.641396933560477,
                    "after": 0.34454855195911416,
                    "delta": -0.29684838160136284
                  },
                  "ser": {
                    "before": 0.864406779661017,
                    "after": 0.597457627118644,
                    "delta": -0.26694915254237295
                  },
                  "exact_match_rate": {
                    "before": 0.13559322033898305,
                    "after": 0.4025423728813559,
                    "delta": 0.26694915254237284
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8527846417184604,
                    "after": 0.9113308628231792,
                    "delta": 0.058546221104718854
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 323.0,
                      "after": 202.0,
                      "delta": -121.0,
                      "before_rate": 0.5726950354609929,
                      "after_rate": 0.35815602836879434
                    },
                    "deletions": {
                      "before": 103.0,
                      "after": 42.0,
                      "delta": -61.0,
                      "before_rate": 0.18262411347517732,
                      "after_rate": 0.07446808510638298
                    },
                    "insertions": {
                      "before": 13.0,
                      "after": 6.0,
                      "delta": -7.0,
                      "before_rate": 0.02304964539007092,
                      "after_rate": 0.010638297872340425
                    },
                    "reference_tokens": {
                      "before": 564.0,
                      "after": 564.0
                    }
                  }
                },
                {
                  "raw": "N/A",
                  "label": "未标注",
                  "key": "unknown",
                  "rank": null,
                  "n": 234,
                  "wer": {
                    "before": 1.8956521739130434,
                    "after": 0.2,
                    "delta": -1.6956521739130435
                  },
                  "cer": {
                    "before": 0.985543369890329,
                    "after": 0.13010967098703888,
                    "delta": -0.8554336989032901
                  },
                  "ser": {
                    "before": 0.9358974358974359,
                    "after": 0.2094017094017094,
                    "delta": -0.7264957264957265
                  },
                  "exact_match_rate": {
                    "before": 0.0641025641025641,
                    "after": 0.7905982905982906,
                    "delta": 0.7264957264957265
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8274721110987867,
                    "after": 0.968872543074127,
                    "delta": 0.14140043197534025
                  },
                  "repetition_rate": {
                    "before": 0.004273504273504274,
                    "after": 0.0,
                    "delta": -0.004273504273504274
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 296.0,
                      "after": 54.0,
                      "delta": -242.0,
                      "before_rate": 0.8579710144927536,
                      "after_rate": 0.1565217391304348
                    },
                    "deletions": {
                      "before": 23.0,
                      "after": 2.0,
                      "delta": -21.0,
                      "before_rate": 0.06666666666666667,
                      "after_rate": 0.005797101449275362
                    },
                    "insertions": {
                      "before": 335.0,
                      "after": 13.0,
                      "delta": -322.0,
                      "before_rate": 0.9710144927536232,
                      "after_rate": 0.03768115942028986
                    },
                    "reference_tokens": {
                      "before": 345.0,
                      "after": 345.0
                    }
                  }
                }
              ],
              "n": 52073,
              "wer": {
                "before": 0.9038671664292334,
                "after": 0.6490435816931993,
                "delta": -0.25482358473603406
              },
              "cer": {
                "before": 0.6898091816970081,
                "after": 0.4680696598607848,
                "delta": -0.2217395218362233
              },
              "ser": {
                "before": 0.7289382213431145,
                "after": 0.5671653256005992,
                "delta": -0.1617728957425153
              },
              "exact_match_rate": {
                "before": 0.2710425748468496,
                "after": 0.4328346743994008,
                "delta": 0.1617920995525512
              },
              "empty_output_rate": {
                "before": 1.9203810035911125e-05,
                "after": 1.9203810035911125e-05,
                "delta": 0.0
              },
              "semscore": {
                "before": 0.8949454928560728,
                "after": 0.9232399195053216,
                "delta": 0.02829442664924875
              },
              "repetition_rate": {
                "before": 0.002285253394273424,
                "after": 0.0002304457204309335,
                "delta": -0.0020548076738424906
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 84814.0,
                  "after": 68913.0,
                  "delta": -15901.0,
                  "before_rate": 0.5865340728344006,
                  "after_rate": 0.4765701719201671
                },
                "deletions": {
                  "before": 9465.0,
                  "after": 10018.0,
                  "delta": 553.0,
                  "before_rate": 0.06545552620295708,
                  "after_rate": 0.06927981632342568
                },
                "insertions": {
                  "before": 36422.0,
                  "after": 14922.0,
                  "delta": -21500.0,
                  "before_rate": 0.2518775673918756,
                  "after_rate": 0.1031935934496065
                },
                "reference_tokens": {
                  "before": 144602.0,
                  "after": 144602.0
                }
              }
            },
            "cdsd": {
              "scope": "cdsd",
              "label": "CDSD",
              "severities": [],
              "n": 29570,
              "wer": {
                "before": 0.9011582946674737,
                "after": 0.7292969538027032,
                "delta": -0.17186134086477045
              },
              "cer": {
                "before": 0.7418171093727337,
                "after": 0.6135113182552192,
                "delta": -0.1283057911175145
              },
              "ser": {
                "before": 0.8613459587419682,
                "after": 0.7765979032803517,
                "delta": -0.08474805546161646
              },
              "exact_match_rate": {
                "before": 0.1386540412580318,
                "after": 0.22340209671964828,
                "delta": 0.08474805546161648
              },
              "empty_output_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "semscore": {
                "before": 0.8832299953886573,
                "after": 0.9000435870142051,
                "delta": 0.01681359162554774
              },
              "repetition_rate": {
                "before": 0.0016909029421711193,
                "after": 0.00037199864727764626,
                "delta": -0.001318904294893473
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 71488.0,
                  "after": 62228.0,
                  "delta": -9260.0,
                  "before_rate": 0.6009010826440724,
                  "after_rate": 0.5230650258893148
                },
                "deletions": {
                  "before": 9035.0,
                  "after": 9752.0,
                  "delta": 717.0,
                  "before_rate": 0.07594479187680721,
                  "after_rate": 0.08197162262120906
                },
                "insertions": {
                  "before": 26686.0,
                  "after": 14783.0,
                  "delta": -11903.0,
                  "before_rate": 0.22431242014659405,
                  "after_rate": 0.12426030529217941
                },
                "reference_tokens": {
                  "before": 118968.0,
                  "after": 118968.0
                }
              }
            },
            "easycall": {
              "scope": "easycall",
              "label": "EasyCall",
              "severities": [
                {
                  "raw": "1",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 1656,
                  "wer": {
                    "before": 1.4079545454545455,
                    "after": 0.07045454545454545,
                    "delta": -1.3375
                  },
                  "cer": {
                    "before": 0.7938346883468834,
                    "after": 0.036246612466124664,
                    "delta": -0.7575880758807587
                  },
                  "ser": {
                    "before": 0.8158212560386473,
                    "after": 0.09480676328502416,
                    "delta": -0.7210144927536232
                  },
                  "exact_match_rate": {
                    "before": 0.18417874396135267,
                    "after": 0.9051932367149759,
                    "delta": 0.7210144927536232
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8760912077510414,
                    "after": 0.9887142688539869,
                    "delta": 0.11262306110294551
                  },
                  "repetition_rate": {
                    "before": 0.004830917874396135,
                    "after": 0.0,
                    "delta": -0.004830917874396135
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 1733.0,
                      "after": 162.0,
                      "delta": -1571.0,
                      "before_rate": 0.656439393939394,
                      "after_rate": 0.06136363636363636
                    },
                    "deletions": {
                      "before": 159.0,
                      "after": 11.0,
                      "delta": -148.0,
                      "before_rate": 0.060227272727272727,
                      "after_rate": 0.004166666666666667
                    },
                    "insertions": {
                      "before": 1825.0,
                      "after": 13.0,
                      "delta": -1812.0,
                      "before_rate": 0.6912878787878788,
                      "after_rate": 0.004924242424242424
                    },
                    "reference_tokens": {
                      "before": 2640.0,
                      "after": 2640.0
                    }
                  }
                },
                {
                  "raw": "2",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 413,
                  "wer": {
                    "before": 1.5493171471927163,
                    "after": 0.4279210925644917,
                    "delta": -1.1213960546282247
                  },
                  "cer": {
                    "before": 1.04640434192673,
                    "after": 0.3226594301221167,
                    "delta": -0.7237449118046133
                  },
                  "ser": {
                    "before": 0.9806295399515739,
                    "after": 0.3728813559322034,
                    "delta": -0.6077481840193705
                  },
                  "exact_match_rate": {
                    "before": 0.01937046004842615,
                    "after": 0.6271186440677966,
                    "delta": 0.6077481840193705
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.821089870704577,
                    "after": 0.9430401065447718,
                    "delta": 0.12195023584019482
                  },
                  "repetition_rate": {
                    "before": 0.004842615012106538,
                    "after": 0.0,
                    "delta": -0.004842615012106538
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 581.0,
                      "after": 177.0,
                      "delta": -404.0,
                      "before_rate": 0.881638846737481,
                      "after_rate": 0.26858877086494687
                    },
                    "deletions": {
                      "before": 66.0,
                      "after": 90.0,
                      "delta": 24.0,
                      "before_rate": 0.10015174506828528,
                      "after_rate": 0.13657056145675264
                    },
                    "insertions": {
                      "before": 374.0,
                      "after": 15.0,
                      "delta": -359.0,
                      "before_rate": 0.56752655538695,
                      "after_rate": 0.02276176024279211
                    },
                    "reference_tokens": {
                      "before": 659.0,
                      "after": 659.0
                    }
                  }
                },
                {
                  "raw": "3",
                  "label": "重度",
                  "key": "severe",
                  "rank": 3,
                  "n": 414,
                  "wer": {
                    "before": 7.174242424242424,
                    "after": 0.6909090909090909,
                    "delta": -6.4833333333333325
                  },
                  "cer": {
                    "before": 3.6344173441734418,
                    "after": 0.5818428184281843,
                    "delta": -3.0525745257452574
                  },
                  "ser": {
                    "before": 0.9903381642512077,
                    "after": 0.6231884057971014,
                    "delta": -0.36714975845410625
                  },
                  "exact_match_rate": {
                    "before": 0.007246376811594203,
                    "after": 0.37681159420289856,
                    "delta": 0.3695652173913044
                  },
                  "empty_output_rate": {
                    "before": 0.0024154589371980675,
                    "after": 0.0,
                    "delta": -0.0024154589371980675
                  },
                  "semscore": {
                    "before": 0.8031966436573149,
                    "after": 0.8918322883366386,
                    "delta": 0.08863564467932372
                  },
                  "repetition_rate": {
                    "before": 0.07246376811594203,
                    "after": 0.0024154589371980675,
                    "delta": -0.07004830917874397
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 578.0,
                      "after": 285.0,
                      "delta": -293.0,
                      "before_rate": 0.8757575757575757,
                      "after_rate": 0.4318181818181818
                    },
                    "deletions": {
                      "before": 75.0,
                      "after": 106.0,
                      "delta": 31.0,
                      "before_rate": 0.11363636363636363,
                      "after_rate": 0.1606060606060606
                    },
                    "insertions": {
                      "before": 4082.0,
                      "after": 65.0,
                      "delta": -4017.0,
                      "before_rate": 6.184848484848485,
                      "after_rate": 0.09848484848484848
                    },
                    "reference_tokens": {
                      "before": 660.0,
                      "after": 660.0
                    }
                  }
                },
                {
                  "raw": "N/A",
                  "label": "未标注",
                  "key": "unknown",
                  "rank": null,
                  "n": 234,
                  "wer": {
                    "before": 1.8956521739130434,
                    "after": 0.2,
                    "delta": -1.6956521739130435
                  },
                  "cer": {
                    "before": 0.985543369890329,
                    "after": 0.13010967098703888,
                    "delta": -0.8554336989032901
                  },
                  "ser": {
                    "before": 0.9358974358974359,
                    "after": 0.2094017094017094,
                    "delta": -0.7264957264957265
                  },
                  "exact_match_rate": {
                    "before": 0.0641025641025641,
                    "after": 0.7905982905982906,
                    "delta": 0.7264957264957265
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8274721110987867,
                    "after": 0.968872543074127,
                    "delta": 0.14140043197534025
                  },
                  "repetition_rate": {
                    "before": 0.004273504273504274,
                    "after": 0.0,
                    "delta": -0.004273504273504274
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 296.0,
                      "after": 54.0,
                      "delta": -242.0,
                      "before_rate": 0.8579710144927536,
                      "after_rate": 0.1565217391304348
                    },
                    "deletions": {
                      "before": 23.0,
                      "after": 2.0,
                      "delta": -21.0,
                      "before_rate": 0.06666666666666667,
                      "after_rate": 0.005797101449275362
                    },
                    "insertions": {
                      "before": 335.0,
                      "after": 13.0,
                      "delta": -322.0,
                      "before_rate": 0.9710144927536232,
                      "after_rate": 0.03768115942028986
                    },
                    "reference_tokens": {
                      "before": 345.0,
                      "after": 345.0
                    }
                  }
                }
              ],
              "n": 2717,
              "wer": {
                "before": 2.3529275092936803,
                "after": 0.23071561338289961,
                "delta": -2.1222118959107807
              },
              "cer": {
                "before": 1.282506938403546,
                "after": 0.17116109523217762,
                "delta": -1.1113458431713683
              },
              "ser": {
                "before": 0.8778064041221936,
                "after": 0.22745675377254324,
                "delta": -0.6503496503496503
              },
              "exact_match_rate": {
                "before": 0.12182554287817446,
                "after": 0.7725432462274567,
                "delta": 0.6507177033492823
              },
              "empty_output_rate": {
                "before": 0.000368052999631947,
                "after": 0.0,
                "delta": -0.000368052999631947
              },
              "semscore": {
                "before": 0.8524542873579904,
                "after": 0.9653003811836243,
                "delta": 0.11284609382563382
              },
              "repetition_rate": {
                "before": 0.015090172984909826,
                "after": 0.000368052999631947,
                "delta": -0.014722119985277879
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 3188.0,
                  "after": 678.0,
                  "delta": -2510.0,
                  "before_rate": 0.7407063197026023,
                  "after_rate": 0.1575278810408922
                },
                "deletions": {
                  "before": 323.0,
                  "after": 209.0,
                  "delta": -114.0,
                  "before_rate": 0.07504646840148699,
                  "after_rate": 0.04855947955390334
                },
                "insertions": {
                  "before": 6616.0,
                  "after": 106.0,
                  "delta": -6510.0,
                  "before_rate": 1.537174721189591,
                  "after_rate": 0.02462825278810409
                },
                "reference_tokens": {
                  "before": 4304.0,
                  "after": 4304.0
                }
              }
            },
            "torgo": {
              "scope": "torgo",
              "label": "TORGO",
              "severities": [
                {
                  "raw": "mild",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 810,
                  "wer": {
                    "before": 0.07058242843040474,
                    "after": 0.029615004935834157,
                    "delta": -0.04096742349457058
                  },
                  "cer": {
                    "before": 0.033322151403332216,
                    "after": 0.020015654702001565,
                    "delta": -0.01330649670133065
                  },
                  "ser": {
                    "before": 0.1506172839506173,
                    "after": 0.05925925925925926,
                    "delta": -0.09135802469135804
                  },
                  "exact_match_rate": {
                    "before": 0.8493827160493828,
                    "after": 0.9407407407407408,
                    "delta": 0.09135802469135801
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.9825345976117217,
                    "after": 0.9934291501104096,
                    "delta": 0.01089455249868787
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 117.0,
                      "after": 44.0,
                      "delta": -73.0,
                      "before_rate": 0.057749259624876606,
                      "after_rate": 0.02171767028627838
                    },
                    "deletions": {
                      "before": 4.0,
                      "after": 14.0,
                      "delta": 10.0,
                      "before_rate": 0.0019743336623889436,
                      "after_rate": 0.006910167818361303
                    },
                    "insertions": {
                      "before": 22.0,
                      "after": 2.0,
                      "delta": -20.0,
                      "before_rate": 0.01085883514313919,
                      "after_rate": 0.0009871668311944718
                    },
                    "reference_tokens": {
                      "before": 2026.0,
                      "after": 2026.0
                    }
                  }
                },
                {
                  "raw": "severe",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 236,
                  "wer": {
                    "before": 0.7783687943262412,
                    "after": 0.4432624113475177,
                    "delta": -0.33510638297872347
                  },
                  "cer": {
                    "before": 0.641396933560477,
                    "after": 0.34454855195911416,
                    "delta": -0.29684838160136284
                  },
                  "ser": {
                    "before": 0.864406779661017,
                    "after": 0.597457627118644,
                    "delta": -0.26694915254237295
                  },
                  "exact_match_rate": {
                    "before": 0.13559322033898305,
                    "after": 0.4025423728813559,
                    "delta": 0.26694915254237284
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8527846417184604,
                    "after": 0.9113308628231792,
                    "delta": 0.058546221104718854
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 323.0,
                      "after": 202.0,
                      "delta": -121.0,
                      "before_rate": 0.5726950354609929,
                      "after_rate": 0.35815602836879434
                    },
                    "deletions": {
                      "before": 103.0,
                      "after": 42.0,
                      "delta": -61.0,
                      "before_rate": 0.18262411347517732,
                      "after_rate": 0.07446808510638298
                    },
                    "insertions": {
                      "before": 13.0,
                      "after": 6.0,
                      "delta": -7.0,
                      "before_rate": 0.02304964539007092,
                      "after_rate": 0.010638297872340425
                    },
                    "reference_tokens": {
                      "before": 564.0,
                      "after": 564.0
                    }
                  }
                }
              ],
              "n": 1046,
              "wer": {
                "before": 0.2247104247104247,
                "after": 0.11969111969111969,
                "delta": -0.10501930501930502
              },
              "cer": {
                "before": 0.15977327074661235,
                "after": 0.08750332122929767,
                "delta": -0.07226994951731468
              },
              "ser": {
                "before": 0.31166347992351817,
                "after": 0.1806883365200765,
                "delta": -0.13097514340344169
              },
              "exact_match_rate": {
                "before": 0.6883365200764818,
                "after": 0.8193116634799236,
                "delta": 0.13097514340344174
              },
              "empty_output_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "semscore": {
                "before": 0.9532602289780604,
                "after": 0.974906018370652,
                "delta": 0.021645789392591652
              },
              "repetition_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 440.0,
                  "after": 246.0,
                  "delta": -194.0,
                  "before_rate": 0.16988416988416988,
                  "after_rate": 0.09498069498069497
                },
                "deletions": {
                  "before": 107.0,
                  "after": 56.0,
                  "delta": -51.0,
                  "before_rate": 0.04131274131274131,
                  "after_rate": 0.021621621621621623
                },
                "insertions": {
                  "before": 35.0,
                  "after": 8.0,
                  "delta": -27.0,
                  "before_rate": 0.013513513513513514,
                  "after_rate": 0.003088803088803089
                },
                "reference_tokens": {
                  "before": 2590.0,
                  "after": 2590.0
                }
              }
            },
            "uaspeech": {
              "scope": "uaspeech",
              "label": "UA-Speech",
              "severities": [
                {
                  "raw": "very low",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 10710,
                  "wer": {
                    "before": 0.35191409897292253,
                    "after": 0.05163398692810457,
                    "delta": -0.30028011204481797
                  },
                  "cer": {
                    "before": 0.16909725788230462,
                    "after": 0.028259902091677794,
                    "delta": -0.14083735579062684
                  },
                  "ser": {
                    "before": 0.24715219421101775,
                    "after": 0.05163398692810457,
                    "delta": -0.1955182072829132
                  },
                  "exact_match_rate": {
                    "before": 0.7528478057889822,
                    "after": 0.9483660130718954,
                    "delta": 0.19551820728291314
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.9683619010459587,
                    "after": 0.9929312686960237,
                    "delta": 0.02456936765006501
                  },
                  "repetition_rate": {
                    "before": 9.337068160597572e-05,
                    "after": 0.0,
                    "delta": -9.337068160597572e-05
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 2568.0,
                      "after": 552.0,
                      "delta": -2016.0,
                      "before_rate": 0.23977591036414567,
                      "after_rate": 0.0515406162464986
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 1201.0,
                      "after": 1.0,
                      "delta": -1200.0,
                      "before_rate": 0.11213818860877685,
                      "after_rate": 9.337068160597572e-05
                    },
                    "reference_tokens": {
                      "before": 10710.0,
                      "after": 10710.0
                    }
                  }
                },
                {
                  "raw": "low",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 2846,
                  "wer": {
                    "before": 0.9511595221363317,
                    "after": 0.26423049894588896,
                    "delta": -0.6869290231904428
                  },
                  "cer": {
                    "before": 0.6175241577435362,
                    "after": 0.22786628362496736,
                    "delta": -0.38965787411856884
                  },
                  "ser": {
                    "before": 0.7217146872803936,
                    "after": 0.26423049894588896,
                    "delta": -0.4574841883345046
                  },
                  "exact_match_rate": {
                    "before": 0.2782853127196065,
                    "after": 0.735769501054111,
                    "delta": 0.4574841883345045
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8845664654201969,
                    "after": 0.9591467008151726,
                    "delta": 0.07458023539497571
                  },
                  "repetition_rate": {
                    "before": 0.00035137034434293746,
                    "after": 0.0,
                    "delta": -0.00035137034434293746
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 2054.0,
                      "after": 752.0,
                      "delta": -1302.0,
                      "before_rate": 0.7217146872803936,
                      "after_rate": 0.26423049894588896
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 653.0,
                      "after": 0.0,
                      "delta": -653.0,
                      "before_rate": 0.22944483485593817,
                      "after_rate": 0.0
                    },
                    "reference_tokens": {
                      "before": 2846.0,
                      "after": 2846.0
                    }
                  }
                },
                {
                  "raw": "high",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 5184,
                  "wer": {
                    "before": 1.2166280864197532,
                    "after": 0.8645833333333334,
                    "delta": -0.3520447530864198
                  },
                  "cer": {
                    "before": 1.1287956268735673,
                    "after": 0.8473990477869864,
                    "delta": -0.2813965790865809
                  },
                  "ser": {
                    "before": 0.9791666666666666,
                    "after": 0.8599537037037037,
                    "delta": -0.11921296296296291
                  },
                  "exact_match_rate": {
                    "before": 0.020833333333333332,
                    "after": 0.1400462962962963,
                    "delta": 0.11921296296296298
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.00019290123456790122,
                    "delta": 0.00019290123456790122
                  },
                  "semscore": {
                    "before": 0.8262890770824419,
                    "after": 0.8593914412123002,
                    "delta": 0.03310236412985823
                  },
                  "repetition_rate": {
                    "before": 0.005015432098765432,
                    "after": 0.0,
                    "delta": -0.005015432098765432
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 5076.0,
                      "after": 4457.0,
                      "delta": -619.0,
                      "before_rate": 0.9791666666666666,
                      "after_rate": 0.8597608024691358
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 1.0,
                      "delta": 1.0,
                      "before_rate": 0.0,
                      "after_rate": 0.00019290123456790122
                    },
                    "insertions": {
                      "before": 1231.0,
                      "after": 24.0,
                      "delta": -1207.0,
                      "before_rate": 0.23746141975308643,
                      "after_rate": 0.004629629629629629
                    },
                    "reference_tokens": {
                      "before": 5184.0,
                      "after": 5184.0
                    }
                  }
                }
              ],
              "n": 18740,
              "wer": {
                "before": 0.6821237993596585,
                "after": 0.30880469583778014,
                "delta": -0.37331910352187836
              },
              "cer": {
                "before": 0.5029140097754009,
                "after": 0.28571008786106783,
                "delta": -0.21720392191433308
              },
              "ser": {
                "before": 0.521718249733191,
                "after": 0.3075240128068303,
                "delta": -0.21419423692636075
              },
              "exact_match_rate": {
                "before": 0.47828175026680897,
                "after": 0.6924759871931697,
                "delta": 0.21419423692636075
              },
              "empty_output_rate": {
                "before": 0.0,
                "after": 5.336179295624333e-05,
                "delta": 5.336179295624333e-05
              },
              "semscore": {
                "before": 0.9163348290492783,
                "after": 0.9508596920757182,
                "delta": 0.03452486302643987
              },
              "repetition_rate": {
                "before": 0.0014941302027748132,
                "after": 0.0,
                "delta": -0.0014941302027748132
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 9698.0,
                  "after": 5761.0,
                  "delta": -3937.0,
                  "before_rate": 0.5175026680896478,
                  "after_rate": 0.3074172892209178
                },
                "deletions": {
                  "before": 0.0,
                  "after": 1.0,
                  "delta": 1.0,
                  "before_rate": 0.0,
                  "after_rate": 5.336179295624333e-05
                },
                "insertions": {
                  "before": 3085.0,
                  "after": 25.0,
                  "delta": -3060.0,
                  "before_rate": 0.16462113127001068,
                  "after_rate": 0.0013340448239060833
                },
                "reference_tokens": {
                  "before": 18740.0,
                  "after": 18740.0
                }
              }
            }
          },
          "id": "qwen25",
          "label": "Qwen2.5-Omni-7B",
          "cohort": "disease",
          "cohort_label": "疾病组"
        }
      }
    },
    {
      "id": "whisper",
      "label": "Whisper large-v3 turbo",
      "cohorts": {
        "disease": {
          "scopes": {
            "ALL": {
              "scope": "ALL",
              "label": "全部测试集",
              "severities": [
                {
                  "raw": "1",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 1656,
                  "wer": {
                    "before": 1.1037878787878788,
                    "after": 0.06401515151515151,
                    "delta": -1.0397727272727273
                  },
                  "cer": {
                    "before": 0.5353658536585366,
                    "after": 0.029336043360433606,
                    "delta": -0.506029810298103
                  },
                  "ser": {
                    "before": 0.8502415458937198,
                    "after": 0.09239130434782608,
                    "delta": -0.7578502415458938
                  },
                  "exact_match_rate": {
                    "before": 0.1497584541062802,
                    "after": 0.907608695652174,
                    "delta": 0.7578502415458938
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8780702865426091,
                    "after": 0.9902452973351963,
                    "delta": 0.11217501079258718
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 1874.0,
                      "after": 153.0,
                      "delta": -1721.0,
                      "before_rate": 0.7098484848484848,
                      "after_rate": 0.05795454545454545
                    },
                    "deletions": {
                      "before": 136.0,
                      "after": 6.0,
                      "delta": -130.0,
                      "before_rate": 0.051515151515151514,
                      "after_rate": 0.0022727272727272726
                    },
                    "insertions": {
                      "before": 904.0,
                      "after": 10.0,
                      "delta": -894.0,
                      "before_rate": 0.3424242424242424,
                      "after_rate": 0.003787878787878788
                    },
                    "reference_tokens": {
                      "before": 2640.0,
                      "after": 2640.0
                    }
                  }
                },
                {
                  "raw": "mild",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 810,
                  "wer": {
                    "before": 0.07354392892398816,
                    "after": 0.037018756169792694,
                    "delta": -0.036525172754195465
                  },
                  "cer": {
                    "before": 0.04293861120429386,
                    "after": 0.016996533601699653,
                    "delta": -0.025942077602594208
                  },
                  "ser": {
                    "before": 0.16049382716049382,
                    "after": 0.08395061728395062,
                    "delta": -0.0765432098765432
                  },
                  "exact_match_rate": {
                    "before": 0.8395061728395061,
                    "after": 0.9160493827160494,
                    "delta": 0.07654320987654328
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.982842665174861,
                    "after": 0.9929789824250304,
                    "delta": 0.010136317250169391
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 125.0,
                      "after": 65.0,
                      "delta": -60.0,
                      "before_rate": 0.061697926949654494,
                      "after_rate": 0.032082922013820334
                    },
                    "deletions": {
                      "before": 3.0,
                      "after": 2.0,
                      "delta": -1.0,
                      "before_rate": 0.0014807502467917078,
                      "after_rate": 0.0009871668311944718
                    },
                    "insertions": {
                      "before": 21.0,
                      "after": 8.0,
                      "delta": -13.0,
                      "before_rate": 0.010365251727541954,
                      "after_rate": 0.003948667324777887
                    },
                    "reference_tokens": {
                      "before": 2026.0,
                      "after": 2026.0
                    }
                  }
                },
                {
                  "raw": "very low",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 10710,
                  "wer": {
                    "before": 0.5778711484593837,
                    "after": 0.07226890756302522,
                    "delta": -0.5056022408963585
                  },
                  "cer": {
                    "before": 0.3858306802232036,
                    "after": 0.036715620827770364,
                    "delta": -0.34911505939543325
                  },
                  "ser": {
                    "before": 0.25845004668534083,
                    "after": 0.07096171802054155,
                    "delta": -0.18748832866479928
                  },
                  "exact_match_rate": {
                    "before": 0.7415499533146592,
                    "after": 0.9290382819794585,
                    "delta": 0.18748832866479925
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.9666031026205762,
                    "after": 0.990506619203881,
                    "delta": 0.023903516583304696
                  },
                  "repetition_rate": {
                    "before": 0.0012138188608776844,
                    "after": 0.0,
                    "delta": -0.0012138188608776844
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 2624.0,
                      "after": 753.0,
                      "delta": -1871.0,
                      "before_rate": 0.2450046685340803,
                      "after_rate": 0.07030812324929972
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 3565.0,
                      "after": 21.0,
                      "delta": -3544.0,
                      "before_rate": 0.33286647992530344,
                      "after_rate": 0.00196078431372549
                    },
                    "reference_tokens": {
                      "before": 10710.0,
                      "after": 10710.0
                    }
                  }
                },
                {
                  "raw": "2",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 413,
                  "wer": {
                    "before": 1.4127465857359636,
                    "after": 0.36722306525037934,
                    "delta": -1.0455235204855842
                  },
                  "cer": {
                    "before": 0.8681139755766621,
                    "after": 0.251831750339213,
                    "delta": -0.6162822252374491
                  },
                  "ser": {
                    "before": 0.9878934624697336,
                    "after": 0.36803874092009686,
                    "delta": -0.6198547215496368
                  },
                  "exact_match_rate": {
                    "before": 0.012106537530266344,
                    "after": 0.6319612590799032,
                    "delta": 0.6198547215496368
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8281971428353908,
                    "after": 0.9526791842451395,
                    "delta": 0.12448204140974872
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 591.0,
                      "after": 167.0,
                      "delta": -424.0,
                      "before_rate": 0.8968133535660091,
                      "after_rate": 0.2534142640364188
                    },
                    "deletions": {
                      "before": 57.0,
                      "after": 62.0,
                      "delta": 5.0,
                      "before_rate": 0.08649468892261002,
                      "after_rate": 0.09408194233687406
                    },
                    "insertions": {
                      "before": 283.0,
                      "after": 13.0,
                      "delta": -270.0,
                      "before_rate": 0.4294385432473445,
                      "after_rate": 0.019726858877086494
                    },
                    "reference_tokens": {
                      "before": 659.0,
                      "after": 659.0
                    }
                  }
                },
                {
                  "raw": "low",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 2846,
                  "wer": {
                    "before": 1.1711173576950105,
                    "after": 0.27266338721011946,
                    "delta": -0.8984539704848911
                  },
                  "cer": {
                    "before": 0.8130060067902847,
                    "after": 0.20083572734395402,
                    "delta": -0.6121702794463306
                  },
                  "ser": {
                    "before": 0.7203092059030218,
                    "after": 0.2670414617006325,
                    "delta": -0.45326774420238936
                  },
                  "exact_match_rate": {
                    "before": 0.2796907940969782,
                    "after": 0.7329585382993675,
                    "delta": 0.4532677442023893
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8839989806134686,
                    "after": 0.9610979216289788,
                    "delta": 0.07709894101551018
                  },
                  "repetition_rate": {
                    "before": 0.0021082220660576245,
                    "after": 0.0,
                    "delta": -0.0021082220660576245
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 2046.0,
                      "after": 760.0,
                      "delta": -1286.0,
                      "before_rate": 0.71890372452565,
                      "after_rate": 0.2670414617006325
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 1287.0,
                      "after": 16.0,
                      "delta": -1271.0,
                      "before_rate": 0.45221363316936053,
                      "after_rate": 0.005621925509486999
                    },
                    "reference_tokens": {
                      "before": 2846.0,
                      "after": 2846.0
                    }
                  }
                },
                {
                  "raw": "3",
                  "label": "重度",
                  "key": "severe",
                  "rank": 3,
                  "n": 414,
                  "wer": {
                    "before": 3.643939393939394,
                    "after": 0.5909090909090909,
                    "delta": -3.053030303030303
                  },
                  "cer": {
                    "before": 2.097289972899729,
                    "after": 0.50840108401084,
                    "delta": -1.588888888888889
                  },
                  "ser": {
                    "before": 0.9927536231884058,
                    "after": 0.6304347826086957,
                    "delta": -0.3623188405797101
                  },
                  "exact_match_rate": {
                    "before": 0.007246376811594203,
                    "after": 0.3695652173913043,
                    "delta": 0.36231884057971014
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.82405785964307,
                    "after": 0.8958219940535688,
                    "delta": 0.07176413441049878
                  },
                  "repetition_rate": {
                    "before": 0.016908212560386472,
                    "after": 0.0,
                    "delta": -0.016908212560386472
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 579.0,
                      "after": 267.0,
                      "delta": -312.0,
                      "before_rate": 0.8772727272727273,
                      "after_rate": 0.40454545454545454
                    },
                    "deletions": {
                      "before": 78.0,
                      "after": 99.0,
                      "delta": 21.0,
                      "before_rate": 0.11818181818181818,
                      "after_rate": 0.15
                    },
                    "insertions": {
                      "before": 1748.0,
                      "after": 24.0,
                      "delta": -1724.0,
                      "before_rate": 2.6484848484848484,
                      "after_rate": 0.03636363636363636
                    },
                    "reference_tokens": {
                      "before": 660.0,
                      "after": 660.0
                    }
                  }
                },
                {
                  "raw": "high",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 5184,
                  "wer": {
                    "before": 3.2351466049382718,
                    "after": 0.8668981481481481,
                    "delta": -2.3682484567901234
                  },
                  "cer": {
                    "before": 3.2652794921530592,
                    "after": 0.7763357432551579,
                    "delta": -2.4889437488979014
                  },
                  "ser": {
                    "before": 0.9909336419753086,
                    "after": 0.8530092592592593,
                    "delta": -0.13792438271604934
                  },
                  "exact_match_rate": {
                    "before": 0.009066358024691358,
                    "after": 0.14699074074074073,
                    "delta": 0.13792438271604937
                  },
                  "empty_output_rate": {
                    "before": 0.0009645061728395061,
                    "after": 0.0,
                    "delta": -0.0009645061728395061
                  },
                  "semscore": {
                    "before": 0.8268476282188921,
                    "after": 0.8616542856289465,
                    "delta": 0.0348066574100544
                  },
                  "repetition_rate": {
                    "before": 0.02141203703703704,
                    "after": 0.0,
                    "delta": -0.02141203703703704
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 5132.0,
                      "after": 4422.0,
                      "delta": -710.0,
                      "before_rate": 0.9899691358024691,
                      "after_rate": 0.8530092592592593
                    },
                    "deletions": {
                      "before": 5.0,
                      "after": 0.0,
                      "delta": -5.0,
                      "before_rate": 0.0009645061728395061,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 11634.0,
                      "after": 72.0,
                      "delta": -11562.0,
                      "before_rate": 2.244212962962963,
                      "after_rate": 0.013888888888888888
                    },
                    "reference_tokens": {
                      "before": 5184.0,
                      "after": 5184.0
                    }
                  }
                },
                {
                  "raw": "severe",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 236,
                  "wer": {
                    "before": 0.7446808510638298,
                    "after": 0.6843971631205674,
                    "delta": -0.06028368794326233
                  },
                  "cer": {
                    "before": 0.5651618398637138,
                    "after": 0.6839863713798978,
                    "delta": 0.118824531516184
                  },
                  "ser": {
                    "before": 0.885593220338983,
                    "after": 0.7415254237288136,
                    "delta": -0.14406779661016944
                  },
                  "exact_match_rate": {
                    "before": 0.11440677966101695,
                    "after": 0.2584745762711864,
                    "delta": 0.14406779661016947
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8624102379811012,
                    "after": 0.8871474319090278,
                    "delta": 0.024737193927926615
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.00423728813559322,
                    "delta": 0.00423728813559322
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 350.0,
                      "after": 296.0,
                      "delta": -54.0,
                      "before_rate": 0.6205673758865248,
                      "after_rate": 0.524822695035461
                    },
                    "deletions": {
                      "before": 31.0,
                      "after": 82.0,
                      "delta": 51.0,
                      "before_rate": 0.0549645390070922,
                      "after_rate": 0.1453900709219858
                    },
                    "insertions": {
                      "before": 39.0,
                      "after": 8.0,
                      "delta": -31.0,
                      "before_rate": 0.06914893617021277,
                      "after_rate": 0.014184397163120567
                    },
                    "reference_tokens": {
                      "before": 564.0,
                      "after": 564.0
                    }
                  }
                },
                {
                  "raw": "N/A",
                  "label": "未标注",
                  "key": "unknown",
                  "rank": null,
                  "n": 234,
                  "wer": {
                    "before": 3.8376811594202898,
                    "after": 0.16231884057971013,
                    "delta": -3.6753623188405795
                  },
                  "cer": {
                    "before": 1.5214356929212363,
                    "after": 0.09770687936191426,
                    "delta": -1.423728813559322
                  },
                  "ser": {
                    "before": 0.9102564102564102,
                    "after": 0.20512820512820512,
                    "delta": -0.7051282051282051
                  },
                  "exact_match_rate": {
                    "before": 0.08974358974358974,
                    "after": 0.7948717948717948,
                    "delta": 0.7051282051282051
                  },
                  "empty_output_rate": {
                    "before": 0.004273504273504274,
                    "after": 0.0,
                    "delta": -0.004273504273504274
                  },
                  "semscore": {
                    "before": 0.8535627429811363,
                    "after": 0.9726145715795012,
                    "delta": 0.11905182859836483
                  },
                  "repetition_rate": {
                    "before": 0.008547008547008548,
                    "after": 0.0,
                    "delta": -0.008547008547008548
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 275.0,
                      "after": 48.0,
                      "delta": -227.0,
                      "before_rate": 0.7971014492753623,
                      "after_rate": 0.1391304347826087
                    },
                    "deletions": {
                      "before": 14.0,
                      "after": 5.0,
                      "delta": -9.0,
                      "before_rate": 0.04057971014492753,
                      "after_rate": 0.014492753623188406
                    },
                    "insertions": {
                      "before": 1035.0,
                      "after": 3.0,
                      "delta": -1032.0,
                      "before_rate": 3.0,
                      "after_rate": 0.008695652173913044
                    },
                    "reference_tokens": {
                      "before": 345.0,
                      "after": 345.0
                    }
                  }
                }
              ],
              "n": 52073,
              "wer": {
                "before": 1.66500463340756,
                "after": 0.955788993236608,
                "delta": -0.7092156401709521
              },
              "cer": {
                "before": 1.2587648355350085,
                "after": 0.598149024709678,
                "delta": -0.6606158108253305
              },
              "ser": {
                "before": 0.7940007297447814,
                "after": 0.651258809747854,
                "delta": -0.14274191999692742
              },
              "exact_match_rate": {
                "before": 0.20599927025521864,
                "after": 0.348741190252146,
                "delta": 0.14274191999692737
              },
              "empty_output_rate": {
                "before": 0.00011522286021546675,
                "after": 0.0,
                "delta": -0.00011522286021546675
              },
              "semscore": {
                "before": 0.8811309058977158,
                "after": 0.9088192872936725,
                "delta": 0.02768838139595664
              },
              "repetition_rate": {
                "before": 0.009525089777811918,
                "after": 0.0016131200430165346,
                "delta": -0.007911969734795384
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 102669.0,
                  "after": 90014.0,
                  "delta": -12655.0,
                  "before_rate": 0.7100109265432013,
                  "after_rate": 0.6224948479274146
                },
                "deletions": {
                  "before": 9122.0,
                  "after": 7399.0,
                  "delta": -1723.0,
                  "before_rate": 0.0630834981535525,
                  "after_rate": 0.05116803363715578
                },
                "insertions": {
                  "before": 128972.0,
                  "after": 40796.0,
                  "delta": -88176.0,
                  "before_rate": 0.8919102087108062,
                  "after_rate": 0.2821261116720377
                },
                "reference_tokens": {
                  "before": 144602.0,
                  "after": 144602.0
                }
              }
            },
            "cdsd": {
              "scope": "cdsd",
              "label": "CDSD",
              "severities": [],
              "n": 29570,
              "wer": {
                "before": 1.7343067043238518,
                "after": 1.0998503799341,
                "delta": -0.6344563243897519
              },
              "cer": {
                "before": 1.3647852867516945,
                "after": 0.8390931858398523,
                "delta": -0.5256921009118423
              },
              "ser": {
                "before": 0.9676022996280014,
                "after": 0.9169428474805547,
                "delta": -0.050659452147446715
              },
              "exact_match_rate": {
                "before": 0.03239770037199865,
                "after": 0.08305715251944538,
                "delta": 0.050659452147446736
              },
              "empty_output_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "semscore": {
                "before": 0.8587053231323011,
                "after": 0.8748419260551368,
                "delta": 0.016136602922835697
              },
              "repetition_rate": {
                "before": 0.012073047007101793,
                "after": 0.0028068988840040583,
                "delta": -0.009266148123097735
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 89073.0,
                  "after": 83083.0,
                  "delta": -5990.0,
                  "before_rate": 0.7487139398829937,
                  "after_rate": 0.6983642660211149
                },
                "deletions": {
                  "before": 8798.0,
                  "after": 7143.0,
                  "delta": -1655.0,
                  "before_rate": 0.07395265953869948,
                  "after_rate": 0.060041355658664516
                },
                "insertions": {
                  "before": 108456.0,
                  "after": 40621.0,
                  "delta": -67835.0,
                  "before_rate": 0.9116401049021585,
                  "after_rate": 0.34144475825432047
                },
                "reference_tokens": {
                  "before": 118968.0,
                  "after": 118968.0
                }
              }
            },
            "easycall": {
              "scope": "easycall",
              "label": "EasyCall",
              "severities": [
                {
                  "raw": "1",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 1656,
                  "wer": {
                    "before": 1.1037878787878788,
                    "after": 0.06401515151515151,
                    "delta": -1.0397727272727273
                  },
                  "cer": {
                    "before": 0.5353658536585366,
                    "after": 0.029336043360433606,
                    "delta": -0.506029810298103
                  },
                  "ser": {
                    "before": 0.8502415458937198,
                    "after": 0.09239130434782608,
                    "delta": -0.7578502415458938
                  },
                  "exact_match_rate": {
                    "before": 0.1497584541062802,
                    "after": 0.907608695652174,
                    "delta": 0.7578502415458938
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8780702865426091,
                    "after": 0.9902452973351963,
                    "delta": 0.11217501079258718
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 1874.0,
                      "after": 153.0,
                      "delta": -1721.0,
                      "before_rate": 0.7098484848484848,
                      "after_rate": 0.05795454545454545
                    },
                    "deletions": {
                      "before": 136.0,
                      "after": 6.0,
                      "delta": -130.0,
                      "before_rate": 0.051515151515151514,
                      "after_rate": 0.0022727272727272726
                    },
                    "insertions": {
                      "before": 904.0,
                      "after": 10.0,
                      "delta": -894.0,
                      "before_rate": 0.3424242424242424,
                      "after_rate": 0.003787878787878788
                    },
                    "reference_tokens": {
                      "before": 2640.0,
                      "after": 2640.0
                    }
                  }
                },
                {
                  "raw": "2",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 413,
                  "wer": {
                    "before": 1.4127465857359636,
                    "after": 0.36722306525037934,
                    "delta": -1.0455235204855842
                  },
                  "cer": {
                    "before": 0.8681139755766621,
                    "after": 0.251831750339213,
                    "delta": -0.6162822252374491
                  },
                  "ser": {
                    "before": 0.9878934624697336,
                    "after": 0.36803874092009686,
                    "delta": -0.6198547215496368
                  },
                  "exact_match_rate": {
                    "before": 0.012106537530266344,
                    "after": 0.6319612590799032,
                    "delta": 0.6198547215496368
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8281971428353908,
                    "after": 0.9526791842451395,
                    "delta": 0.12448204140974872
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 591.0,
                      "after": 167.0,
                      "delta": -424.0,
                      "before_rate": 0.8968133535660091,
                      "after_rate": 0.2534142640364188
                    },
                    "deletions": {
                      "before": 57.0,
                      "after": 62.0,
                      "delta": 5.0,
                      "before_rate": 0.08649468892261002,
                      "after_rate": 0.09408194233687406
                    },
                    "insertions": {
                      "before": 283.0,
                      "after": 13.0,
                      "delta": -270.0,
                      "before_rate": 0.4294385432473445,
                      "after_rate": 0.019726858877086494
                    },
                    "reference_tokens": {
                      "before": 659.0,
                      "after": 659.0
                    }
                  }
                },
                {
                  "raw": "3",
                  "label": "重度",
                  "key": "severe",
                  "rank": 3,
                  "n": 414,
                  "wer": {
                    "before": 3.643939393939394,
                    "after": 0.5909090909090909,
                    "delta": -3.053030303030303
                  },
                  "cer": {
                    "before": 2.097289972899729,
                    "after": 0.50840108401084,
                    "delta": -1.588888888888889
                  },
                  "ser": {
                    "before": 0.9927536231884058,
                    "after": 0.6304347826086957,
                    "delta": -0.3623188405797101
                  },
                  "exact_match_rate": {
                    "before": 0.007246376811594203,
                    "after": 0.3695652173913043,
                    "delta": 0.36231884057971014
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.82405785964307,
                    "after": 0.8958219940535688,
                    "delta": 0.07176413441049878
                  },
                  "repetition_rate": {
                    "before": 0.016908212560386472,
                    "after": 0.0,
                    "delta": -0.016908212560386472
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 579.0,
                      "after": 267.0,
                      "delta": -312.0,
                      "before_rate": 0.8772727272727273,
                      "after_rate": 0.40454545454545454
                    },
                    "deletions": {
                      "before": 78.0,
                      "after": 99.0,
                      "delta": 21.0,
                      "before_rate": 0.11818181818181818,
                      "after_rate": 0.15
                    },
                    "insertions": {
                      "before": 1748.0,
                      "after": 24.0,
                      "delta": -1724.0,
                      "before_rate": 2.6484848484848484,
                      "after_rate": 0.03636363636363636
                    },
                    "reference_tokens": {
                      "before": 660.0,
                      "after": 660.0
                    }
                  }
                },
                {
                  "raw": "N/A",
                  "label": "未标注",
                  "key": "unknown",
                  "rank": null,
                  "n": 234,
                  "wer": {
                    "before": 3.8376811594202898,
                    "after": 0.16231884057971013,
                    "delta": -3.6753623188405795
                  },
                  "cer": {
                    "before": 1.5214356929212363,
                    "after": 0.09770687936191426,
                    "delta": -1.423728813559322
                  },
                  "ser": {
                    "before": 0.9102564102564102,
                    "after": 0.20512820512820512,
                    "delta": -0.7051282051282051
                  },
                  "exact_match_rate": {
                    "before": 0.08974358974358974,
                    "after": 0.7948717948717948,
                    "delta": 0.7051282051282051
                  },
                  "empty_output_rate": {
                    "before": 0.004273504273504274,
                    "after": 0.0,
                    "delta": -0.004273504273504274
                  },
                  "semscore": {
                    "before": 0.8535627429811363,
                    "after": 0.9726145715795012,
                    "delta": 0.11905182859836483
                  },
                  "repetition_rate": {
                    "before": 0.008547008547008548,
                    "after": 0.0,
                    "delta": -0.008547008547008548
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 275.0,
                      "after": 48.0,
                      "delta": -227.0,
                      "before_rate": 0.7971014492753623,
                      "after_rate": 0.1391304347826087
                    },
                    "deletions": {
                      "before": 14.0,
                      "after": 5.0,
                      "delta": -9.0,
                      "before_rate": 0.04057971014492753,
                      "after_rate": 0.014492753623188406
                    },
                    "insertions": {
                      "before": 1035.0,
                      "after": 3.0,
                      "delta": -1032.0,
                      "before_rate": 3.0,
                      "after_rate": 0.008695652173913044
                    },
                    "reference_tokens": {
                      "before": 345.0,
                      "after": 345.0
                    }
                  }
                }
              ],
              "n": 2717,
              "wer": {
                "before": 1.7597583643122676,
                "after": 0.1991171003717472,
                "delta": -1.5606412639405205
              },
              "cer": {
                "before": 0.9068389876144318,
                "after": 0.14220620521105173,
                "delta": -0.7646327824033801
              },
              "ser": {
                "before": 0.8980493191019506,
                "after": 0.22598454177401545,
                "delta": -0.6720647773279351
              },
              "exact_match_rate": {
                "before": 0.10195068089804932,
                "after": 0.7740154582259845,
                "delta": 0.6720647773279351
              },
              "empty_output_rate": {
                "before": 0.000368052999631947,
                "after": 0.0,
                "delta": -0.000368052999631947
              },
              "semscore": {
                "before": 0.8601484910767,
                "after": 0.9686289402900656,
                "delta": 0.10848044921336564
              },
              "repetition_rate": {
                "before": 0.003312476996687523,
                "after": 0.0,
                "delta": -0.003312476996687523
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 3319.0,
                  "after": 635.0,
                  "delta": -2684.0,
                  "before_rate": 0.7711431226765799,
                  "after_rate": 0.1475371747211896
                },
                "deletions": {
                  "before": 285.0,
                  "after": 172.0,
                  "delta": -113.0,
                  "before_rate": 0.0662174721189591,
                  "after_rate": 0.039962825278810406
                },
                "insertions": {
                  "before": 3970.0,
                  "after": 50.0,
                  "delta": -3920.0,
                  "before_rate": 0.9223977695167286,
                  "after_rate": 0.011617100371747211
                },
                "reference_tokens": {
                  "before": 4304.0,
                  "after": 4304.0
                }
              }
            },
            "torgo": {
              "scope": "torgo",
              "label": "TORGO",
              "severities": [
                {
                  "raw": "mild",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 810,
                  "wer": {
                    "before": 0.07354392892398816,
                    "after": 0.037018756169792694,
                    "delta": -0.036525172754195465
                  },
                  "cer": {
                    "before": 0.04293861120429386,
                    "after": 0.016996533601699653,
                    "delta": -0.025942077602594208
                  },
                  "ser": {
                    "before": 0.16049382716049382,
                    "after": 0.08395061728395062,
                    "delta": -0.0765432098765432
                  },
                  "exact_match_rate": {
                    "before": 0.8395061728395061,
                    "after": 0.9160493827160494,
                    "delta": 0.07654320987654328
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.982842665174861,
                    "after": 0.9929789824250304,
                    "delta": 0.010136317250169391
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 125.0,
                      "after": 65.0,
                      "delta": -60.0,
                      "before_rate": 0.061697926949654494,
                      "after_rate": 0.032082922013820334
                    },
                    "deletions": {
                      "before": 3.0,
                      "after": 2.0,
                      "delta": -1.0,
                      "before_rate": 0.0014807502467917078,
                      "after_rate": 0.0009871668311944718
                    },
                    "insertions": {
                      "before": 21.0,
                      "after": 8.0,
                      "delta": -13.0,
                      "before_rate": 0.010365251727541954,
                      "after_rate": 0.003948667324777887
                    },
                    "reference_tokens": {
                      "before": 2026.0,
                      "after": 2026.0
                    }
                  }
                },
                {
                  "raw": "severe",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 236,
                  "wer": {
                    "before": 0.7446808510638298,
                    "after": 0.6843971631205674,
                    "delta": -0.06028368794326233
                  },
                  "cer": {
                    "before": 0.5651618398637138,
                    "after": 0.6839863713798978,
                    "delta": 0.118824531516184
                  },
                  "ser": {
                    "before": 0.885593220338983,
                    "after": 0.7415254237288136,
                    "delta": -0.14406779661016944
                  },
                  "exact_match_rate": {
                    "before": 0.11440677966101695,
                    "after": 0.2584745762711864,
                    "delta": 0.14406779661016947
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8624102379811012,
                    "after": 0.8871474319090278,
                    "delta": 0.024737193927926615
                  },
                  "repetition_rate": {
                    "before": 0.0,
                    "after": 0.00423728813559322,
                    "delta": 0.00423728813559322
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 350.0,
                      "after": 296.0,
                      "delta": -54.0,
                      "before_rate": 0.6205673758865248,
                      "after_rate": 0.524822695035461
                    },
                    "deletions": {
                      "before": 31.0,
                      "after": 82.0,
                      "delta": 51.0,
                      "before_rate": 0.0549645390070922,
                      "after_rate": 0.1453900709219858
                    },
                    "insertions": {
                      "before": 39.0,
                      "after": 8.0,
                      "delta": -31.0,
                      "before_rate": 0.06914893617021277,
                      "after_rate": 0.014184397163120567
                    },
                    "reference_tokens": {
                      "before": 564.0,
                      "after": 564.0
                    }
                  }
                }
              ],
              "n": 1046,
              "wer": {
                "before": 0.21969111969111968,
                "after": 0.177992277992278,
                "delta": -0.04169884169884169
              },
              "cer": {
                "before": 0.15153662208838897,
                "after": 0.15569922947480294,
                "delta": 0.004162607386413969
              },
              "ser": {
                "before": 0.3240917782026769,
                "after": 0.2323135755258126,
                "delta": -0.09177820267686426
              },
              "exact_match_rate": {
                "before": 0.6759082217973231,
                "after": 0.7676864244741873,
                "delta": 0.0917782026768642
              },
              "empty_output_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "semscore": {
                "before": 0.9556705305498827,
                "after": 0.9691011182550718,
                "delta": 0.013430587705189123
              },
              "repetition_rate": {
                "before": 0.0,
                "after": 0.0009560229445506692,
                "delta": 0.0009560229445506692
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 475.0,
                  "after": 361.0,
                  "delta": -114.0,
                  "before_rate": 0.1833976833976834,
                  "after_rate": 0.13938223938223937
                },
                "deletions": {
                  "before": 34.0,
                  "after": 84.0,
                  "delta": 50.0,
                  "before_rate": 0.013127413127413128,
                  "after_rate": 0.032432432432432434
                },
                "insertions": {
                  "before": 60.0,
                  "after": 16.0,
                  "delta": -44.0,
                  "before_rate": 0.023166023166023165,
                  "after_rate": 0.006177606177606178
                },
                "reference_tokens": {
                  "before": 2590.0,
                  "after": 2590.0
                }
              }
            },
            "uaspeech": {
              "scope": "uaspeech",
              "label": "UA-Speech",
              "severities": [
                {
                  "raw": "very low",
                  "label": "轻度",
                  "key": "mild",
                  "rank": 1,
                  "n": 10710,
                  "wer": {
                    "before": 0.5778711484593837,
                    "after": 0.07226890756302522,
                    "delta": -0.5056022408963585
                  },
                  "cer": {
                    "before": 0.3858306802232036,
                    "after": 0.036715620827770364,
                    "delta": -0.34911505939543325
                  },
                  "ser": {
                    "before": 0.25845004668534083,
                    "after": 0.07096171802054155,
                    "delta": -0.18748832866479928
                  },
                  "exact_match_rate": {
                    "before": 0.7415499533146592,
                    "after": 0.9290382819794585,
                    "delta": 0.18748832866479925
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.9666031026205762,
                    "after": 0.990506619203881,
                    "delta": 0.023903516583304696
                  },
                  "repetition_rate": {
                    "before": 0.0012138188608776844,
                    "after": 0.0,
                    "delta": -0.0012138188608776844
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 2624.0,
                      "after": 753.0,
                      "delta": -1871.0,
                      "before_rate": 0.2450046685340803,
                      "after_rate": 0.07030812324929972
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 3565.0,
                      "after": 21.0,
                      "delta": -3544.0,
                      "before_rate": 0.33286647992530344,
                      "after_rate": 0.00196078431372549
                    },
                    "reference_tokens": {
                      "before": 10710.0,
                      "after": 10710.0
                    }
                  }
                },
                {
                  "raw": "low",
                  "label": "中度",
                  "key": "moderate",
                  "rank": 2,
                  "n": 2846,
                  "wer": {
                    "before": 1.1711173576950105,
                    "after": 0.27266338721011946,
                    "delta": -0.8984539704848911
                  },
                  "cer": {
                    "before": 0.8130060067902847,
                    "after": 0.20083572734395402,
                    "delta": -0.6121702794463306
                  },
                  "ser": {
                    "before": 0.7203092059030218,
                    "after": 0.2670414617006325,
                    "delta": -0.45326774420238936
                  },
                  "exact_match_rate": {
                    "before": 0.2796907940969782,
                    "after": 0.7329585382993675,
                    "delta": 0.4532677442023893
                  },
                  "empty_output_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "semscore": {
                    "before": 0.8839989806134686,
                    "after": 0.9610979216289788,
                    "delta": 0.07709894101551018
                  },
                  "repetition_rate": {
                    "before": 0.0021082220660576245,
                    "after": 0.0,
                    "delta": -0.0021082220660576245
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 2046.0,
                      "after": 760.0,
                      "delta": -1286.0,
                      "before_rate": 0.71890372452565,
                      "after_rate": 0.2670414617006325
                    },
                    "deletions": {
                      "before": 0.0,
                      "after": 0.0,
                      "delta": 0.0,
                      "before_rate": 0.0,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 1287.0,
                      "after": 16.0,
                      "delta": -1271.0,
                      "before_rate": 0.45221363316936053,
                      "after_rate": 0.005621925509486999
                    },
                    "reference_tokens": {
                      "before": 2846.0,
                      "after": 2846.0
                    }
                  }
                },
                {
                  "raw": "high",
                  "label": "极重度",
                  "key": "profound",
                  "rank": 4,
                  "n": 5184,
                  "wer": {
                    "before": 3.2351466049382718,
                    "after": 0.8668981481481481,
                    "delta": -2.3682484567901234
                  },
                  "cer": {
                    "before": 3.2652794921530592,
                    "after": 0.7763357432551579,
                    "delta": -2.4889437488979014
                  },
                  "ser": {
                    "before": 0.9909336419753086,
                    "after": 0.8530092592592593,
                    "delta": -0.13792438271604934
                  },
                  "exact_match_rate": {
                    "before": 0.009066358024691358,
                    "after": 0.14699074074074073,
                    "delta": 0.13792438271604937
                  },
                  "empty_output_rate": {
                    "before": 0.0009645061728395061,
                    "after": 0.0,
                    "delta": -0.0009645061728395061
                  },
                  "semscore": {
                    "before": 0.8268476282188921,
                    "after": 0.8616542856289465,
                    "delta": 0.0348066574100544
                  },
                  "repetition_rate": {
                    "before": 0.02141203703703704,
                    "after": 0.0,
                    "delta": -0.02141203703703704
                  },
                  "deviation_rate": {
                    "before": 0.0,
                    "after": 0.0,
                    "delta": 0.0
                  },
                  "edits": {
                    "substitutions": {
                      "before": 5132.0,
                      "after": 4422.0,
                      "delta": -710.0,
                      "before_rate": 0.9899691358024691,
                      "after_rate": 0.8530092592592593
                    },
                    "deletions": {
                      "before": 5.0,
                      "after": 0.0,
                      "delta": -5.0,
                      "before_rate": 0.0009645061728395061,
                      "after_rate": 0.0
                    },
                    "insertions": {
                      "before": 11634.0,
                      "after": 72.0,
                      "delta": -11562.0,
                      "before_rate": 2.244212962962963,
                      "after_rate": 0.013888888888888888
                    },
                    "reference_tokens": {
                      "before": 5184.0,
                      "after": 5184.0
                    }
                  }
                }
              ],
              "n": 18740,
              "wer": {
                "before": 1.4030416221985058,
                "after": 0.3225186766275347,
                "delta": -1.080522945570971
              },
              "cer": {
                "before": 1.2496449315819889,
                "after": 0.26675678058241015,
                "delta": -0.9828881509995787
              },
              "ser": {
                "before": 0.5312166488794023,
                "after": 0.3170757737459979,
                "delta": -0.21414087513340446
              },
              "exact_match_rate": {
                "before": 0.46878335112059766,
                "after": 0.6829242262540022,
                "delta": 0.21414087513340452
              },
              "empty_output_rate": {
                "before": 0.00026680896478121667,
                "after": 0.0,
                "delta": -0.00026680896478121667
              },
              "semscore": {
                "before": 0.9153979953350608,
                "after": 0.9503962856632923,
                "delta": 0.03499829032823143
              },
              "repetition_rate": {
                "before": 0.006937033084311633,
                "after": 0.0,
                "delta": -0.006937033084311633
              },
              "deviation_rate": {
                "before": 0.0,
                "after": 0.0,
                "delta": 0.0
              },
              "edits": {
                "substitutions": {
                  "before": 9802.0,
                  "after": 5935.0,
                  "delta": -3867.0,
                  "before_rate": 0.5230522945570971,
                  "after_rate": 0.31670224119530416
                },
                "deletions": {
                  "before": 5.0,
                  "after": 0.0,
                  "delta": -5.0,
                  "before_rate": 0.00026680896478121667,
                  "after_rate": 0.0
                },
                "insertions": {
                  "before": 16486.0,
                  "after": 109.0,
                  "delta": -16377.0,
                  "before_rate": 0.8797225186766275,
                  "after_rate": 0.005816435432230523
                },
                "reference_tokens": {
                  "before": 18740.0,
                  "after": 18740.0
                }
              }
            }
          },
          "id": "whisper",
          "label": "Whisper large-v3 turbo",
          "cohort": "disease",
          "cohort_label": "疾病组"
        }
      }
    }
  ],
  "sources": [
    "Finetune/manifests/research/annotated.jsonl",
    "Finetune/manifests/research/fold-{0..4}/",
    "finetuning/analysis/metrics/baseline_vs_finetuned.csv",
    "finetuning/analysis/metrics/control_baseline_vs_finetuned.csv",
    "Phi4Finetune / Qwen25Finetune / WhisperFinetune training receipts"
  ]
};
