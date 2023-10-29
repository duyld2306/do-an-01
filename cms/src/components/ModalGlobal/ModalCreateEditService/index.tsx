import { useMemo, useRef } from "react";
import { Formik, FormikProps } from "formik";
import { Col, Row } from "antd";
import ModalGlobal from "..";
import ApiService, { ICreateServiceBody, IServiceRes } from "@/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notification from "@/components/Notification";
import FormGlobal, {
  FormItemGlobal,
  InputFormikGlobal,
  InputNumberGlobal,
} from "@/components/FormGlobal";
import { ServiceValidation } from "@/utils/validation/service";

interface IModalCreateEditService {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  selectedService?: IServiceRes;
}

export default function ModalCreateEditService({
  isOpenModal,
  handleCloseModal,
  selectedService,
}: IModalCreateEditService) {
  const innerRef = useRef<FormikProps<ICreateServiceBody>>(null);
  const queryClient = useQueryClient();

  const initialValues: ICreateServiceBody = useMemo(() => {
    return {
      name: selectedService?.name ?? "",
      unity: selectedService?.unity ?? "",
      description: selectedService?.description ?? "",
      price: selectedService?.price ?? 0,
    };
  }, [selectedService]);

  const onCancel = () => {
    handleCloseModal();
    innerRef.current?.resetForm();
  };

  const createServiceMutation = useMutation(ApiService.createService);
  const updateServiceMutation = useMutation(ApiService.updateService);
  const handleSubmit = async (values: ICreateServiceBody) => {
    if (selectedService) {
      updateServiceMutation.mutate(
        { id: selectedService.id, body: values },
        {
          onSuccess: () => {
            Notification.notificationSuccess("Thành công");
            queryClient.refetchQueries(["get_services"]);
            onCancel();
          },
        },
      );
      return;
    }
    createServiceMutation.mutate(values, {
      onSuccess: () => {
        Notification.notificationSuccess("Thành công");
        queryClient.refetchQueries(["get_services"]);
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
      validationSchema={ServiceValidation}
    >
      {({ handleSubmit }): JSX.Element => {
        return (
          <ModalGlobal
            open={isOpenModal}
            title={selectedService ? "Sửa thông tin dịch vụ" : "Tạo dịch vụ"}
            onOk={handleSubmit}
            onCancel={onCancel}
            isLoadingOK={
              createServiceMutation.isLoading || updateServiceMutation.isLoading
            }
            width={1000}
          >
            <FormGlobal>
              <Row gutter={[8, 0]}>
                <Col span={12}>
                  <FormItemGlobal name="name" label="Tên dịch vụ" required>
                    <InputFormikGlobal name="name" placeholder="Tên dịch vụ" />
                  </FormItemGlobal>
                  <FormItemGlobal
                    name="price"
                    label="Giá dịch vụ (vnđ)"
                    required
                  >
                    <InputNumberGlobal
                      name="price"
                      placeholder="Giá dịch vụ (vnđ)"
                      min={0}
                    />
                  </FormItemGlobal>
                </Col>
                <Col span={12}>
                  <FormItemGlobal name="description" label="Mô tả">
                    <InputFormikGlobal name="description" placeholder="Mô tả" />
                  </FormItemGlobal>
                  <FormItemGlobal name="unity" label="Đơn vị">
                    <InputFormikGlobal name="unity" placeholder="Đơn vị" />
                  </FormItemGlobal>
                </Col>
              </Row>
            </FormGlobal>
          </ModalGlobal>
        );
      }}
    </Formik>
  );
}
