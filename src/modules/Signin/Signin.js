import { useState, useRef } from "react";
import { Form, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../constants/_routes";
import InputForm from "../../Components/Inputs";
import { submitLogin } from "./services";
import Alert from "../../Components/Alert";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/auth";
import { getToken } from "../../network";

function SignIn() {
  const [isLoading, updateIsLoading] = useState(false);
  const [hasError, updateHasError] = useState({ status: false, message: null });
  const formRef = useRef();
  const { size } = useSelector((state) => state.screen);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    updateIsLoading(true);
    let data = { ...values };
    updateIsLoading(false);
    submitLogin(
      data,
      (success) => {
        dispatch(login(success.data));
        updateIsLoading(false);
        navigate(ROUTES.DASHBOARD);
        getToken(success.data.token);
      },
      (fail) => {
        updateIsLoading(false);
        let hasErrorObject = { ...hasError };
        hasErrorObject.status = true;
        hasErrorObject.message = fail?.data?.message;
        hasErrorObject.link = null;
        updateHasError({ ...hasErrorObject });
      }
    );
  };

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formRef.current
        .validateFields()
        .then(() => {
          formRef.current.submit();
        })
        .catch((error) => {
          console.log("Form validation failed:", error);
        });
    }
  };

  return (
    <div className="signIn-page w-100">
      <div className="form-container">
        <div className="d-flex justify-content-center alert-box">
          <Alert
            severity="error"
            open={hasError.status}
            onClose={() => {
              updateHasError({ status: false, message: null });
            }}
          >
            {t(hasError.message)}
          </Alert>
        </div>

        <Form onFinish={onFinish} ref={formRef}>
          <div
            className={`f-rubik-${size === "small" ? "20px" : "32px"} fw-500`}
          >
            {t("hiAdmin")}
          </div>
          <div className="mt-4 mb-3">
            <Form.Item
              label=""
              name="email"
              rules={[
                { required: true, message: t("pleaseEnterEmail") },
                { type: "email", message: t("InvalidEmail") },
              ]}
              className={``}
            >
              <InputForm
                label={t("email")}
                className={`input-${size === "small" ? "xmd" : "lg"}`}
                onKeyPress={onEnterKeyPress}
              />
            </Form.Item>
            <Form.Item
              label=""
              name="password"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) return Promise.reject(t("pleaseEnterPassword"));
                    else if (value.length < 8)
                      return Promise.reject(t("PleaseEnterAtLeas8Characters"));
                    else return Promise.resolve();
                  },
                },
              ]}
            >
              <InputForm
                label={t("password")}
                type="password"
                className={`input-${size === "small" ? "xmd" : "lg"}`}
                onKeyPress={onEnterKeyPress}
              />
            </Form.Item>

            <div className="d-flex justify-content-center">
              <Button
                htmlType="submit"
                loading={isLoading}
                className={`btn-primary-${size === "small" ? "xmd" : "lg"}`}
              >
                {t("login")}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
