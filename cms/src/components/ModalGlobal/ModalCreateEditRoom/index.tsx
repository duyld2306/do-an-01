import { useEffect, useRef, useState } from "react";
import { Formik, FormikProps } from "formik";
import { Button, Col, Row, Upload } from "antd";
import FormGlobal, { FormItemGlobal, InputGlobal } from "../../FormGlobal";
import ModalGlobal from "..";
import ApiRoom, { IRoomRes } from "@/api/ApiRoom";
import { RcFile } from "antd/lib/upload";
import { useMutation } from "@tanstack/react-query";
import Notification from "@/components/Notification";

interface ICreateRomeBody {
  name: string;
  price: string;
  description?: string;
  featureRooms?: string[];
  // files: Blob;
}

interface IModalCreateEditRoom {
  isOpenModal: boolean;
  onclose: () => void;
  dataSelected?: IRoomRes;
}

export default function ModalCreateEditRoom({
  isOpenModal,
  onclose,
}: IModalCreateEditRoom) {
  const [fileList, setFileList] = useState<string[]>([]);
  const [blobList, setBlobList] = useState<Blob[]>([]);

  const beforeUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileList((prevState) => [...prevState, reader.result as string]);
    };
    reader.readAsDataURL(file);
    return false;
  };

  useEffect(() => {
    const fetchBlobs = async () => {
      const blobs = await Promise.all(
        fileList.map(async (file) => {
          const response = await fetch(file);
          return response.blob();
        })
      );
      setBlobList(blobs);
    };

    fetchBlobs();
  }, [fileList]);

  console.log("blobList", blobList);

  const innerRef = useRef<FormikProps<ICreateRomeBody>>(null);

  const initialValues = {
    name: "",
    price: "",
    description: "",
    featureRooms: [],
  };

  const handleCancel = () => {
    onclose();
  };

  const createRoomMutation = useMutation(ApiRoom.createRoom);
  const handleSubmit = (data: ICreateRomeBody) => {
    console.log(data);
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    for (const [_, blob] of blobList.entries()) {
      formData.append("files", blob);
    }
    createRoomMutation.mutate(formData, {
      onSuccess: () => {
        Notification.notificationSuccess("Thành công");
      },
    });
  };

  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(formikProps): JSX.Element => {
        return (
          <ModalGlobal
            open={isOpenModal}
            title="Đặt phòng"
            onOk={formikProps.handleSubmit}
            onCancel={handleCancel}
            width={1000}
          >
            <FormGlobal>
              <Row gutter={[8, 0]}>
                <Col span={12}>
                  <FormItemGlobal name="name" label="Tên phòng" required>
                    <InputGlobal name="name" placeholder="Tên phòng" />
                  </FormItemGlobal>
                  <FormItemGlobal name="price" label="Giá phòng" required>
                    <InputGlobal name="price" placeholder="Giá phòng" />
                  </FormItemGlobal>
                </Col>
                <Col span={12}>
                  <FormItemGlobal name="description" label="Mô tả" required>
                    <InputGlobal name="description" placeholder="Mô tả" />
                  </FormItemGlobal>
                  <FormItemGlobal
                    name="featureRooms"
                    label="Tính năng"
                    required
                  >
                    <InputGlobal name="featureRooms" placeholder="Tính năng" />
                  </FormItemGlobal>
                </Col>
              </Row>
              <div>
                <Upload beforeUpload={beforeUpload} multiple={true}>
                  <Button>Click to Upload</Button>
                </Upload>
                <ul>
                  {fileList.map((file, index) => (
                    <li key={index}>
                      <img
                        src={file}
                        alt={`img-${index}`}
                        height="100"
                        width="100"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </FormGlobal>
          </ModalGlobal>
        );
      }}
    </Formik>
  );
}
