import { useRef, useState } from "react";
import { Formik, FormikProps } from "formik";
import { Col, Row, Upload } from "antd";
import ModalGlobal from "..";
import ApiRoom, { IRoomRes } from "@/api/ApiRoom";
import { RcFile, UploadFile } from "antd/lib/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notification from "@/components/Notification";
import FormGlobal, {
  FormItemGlobal,
  InputFormikGlobal,
  InputNumberGlobal,
  SelectFormikGlobal,
} from "@/components/FormGlobal";
import { RoomValidation } from "@/utils/validation/room";

interface ICreateRomeBody {
  name: string;
  price: number;
  description: string;
  featureRooms: number[];
  files: string[];
}

interface IModalCreateEditRoom {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  roomSelected?: IRoomRes;
}

export default function ModalCreateEditRoom({
  isOpenModal,
  handleCloseModal,
  roomSelected,
}: IModalCreateEditRoom) {
  const [blobs, setBlobs] = useState<{ id: string; blob: Blob }[]>([]);
  console.log("blobs", blobs);

  const innerRef = useRef<FormikProps<ICreateRomeBody>>(null);
  const queryClient = useQueryClient();

  const initialValues: ICreateRomeBody = {
    name: roomSelected?.name ?? "",
    price: roomSelected?.price ?? 0,
    description: roomSelected?.description ?? "",
    featureRooms: roomSelected?.featureRooms ?? [],
    files: roomSelected?.images ?? [],
  };

  const beforeUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const response = await fetch(reader.result as string);
      const blob = await response.blob();
      setBlobs((prevState) => {
        const tempArray = [...prevState, { id: file.uid, blob }];
        innerRef.current?.setFieldValue("files", tempArray);
        return tempArray;
      });
    };
    reader.readAsDataURL(file);
    return false;
  };

  const onRemove = (file: UploadFile<RcFile>) => {
    setBlobs((prevState) => {
      const tempArray = prevState.filter((blob) => blob.id !== file.uid);
      innerRef.current?.setFieldValue("files", tempArray);
      return tempArray;
    });
  };

  const onCancel = () => {
    handleCloseModal();
    setBlobs([]);
    innerRef.current?.resetForm();
  };

  const createRoomMutation = useMutation(ApiRoom.createRoom);
  const handleSubmit = (values: ICreateRomeBody) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "files") {
        blobs.forEach((blob) => formData.append(key, blob.blob));
      } else {
        formData.append(key, value);
      }
    });

    createRoomMutation.mutate(formData, {
      onSuccess: () => {
        Notification.notificationSuccess("Thành công");
        queryClient.refetchQueries(["get_rooms"]);
        onCancel();
      },
    });
  };

  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={RoomValidation}
    >
      {({ handleSubmit }): JSX.Element => {
        return (
          <ModalGlobal
            open={isOpenModal}
            title={roomSelected ? "Sửa thông tin phòng" : "Tạo phòng"}
            onOk={handleSubmit}
            onCancel={onCancel}
            isLoadingOK={createRoomMutation.isLoading}
            width={1000}
          >
            <FormGlobal>
              <Row gutter={[8, 0]}>
                <Col span={12}>
                  <FormItemGlobal name="name" label="Tên phòng" required>
                    <InputFormikGlobal name="name" placeholder="Tên phòng" />
                  </FormItemGlobal>
                  <FormItemGlobal name="price" label="Giá phòng (vnđ)">
                    <InputNumberGlobal
                      name="price"
                      placeholder="Giá phòng (vnđ)"
                      min={0}
                    />
                  </FormItemGlobal>
                </Col>
                <Col span={12}>
                  <FormItemGlobal name="description" label="Mô tả">
                    <InputFormikGlobal name="description" placeholder="Mô tả" />
                  </FormItemGlobal>
                  <FormItemGlobal name="featureRooms" label="Tính năng">
                    <SelectFormikGlobal
                      name="featureRooms"
                      mode="tags"
                      placeholder="Tính năng"
                    />
                  </FormItemGlobal>
                </Col>
              </Row>
              <FormItemGlobal name="files" label="Ảnh minh họa" required>
                <Upload
                  listType="picture-card"
                  accept=".png,.jpg,.jpeg"
                  beforeUpload={beforeUpload}
                  onRemove={onRemove}
                  multiple={true}
                >
                  {blobs.length < 5 && "Upload"}
                </Upload>
              </FormItemGlobal>
            </FormGlobal>
          </ModalGlobal>
        );
      }}
    </Formik>
  );
}
