/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum LikeAction {
  Value0 = 0,
  Value1 = 1,
}

export interface IsotopeView {
  /**
   * Идентификатор изотопа
   * @example 1
   */
  id: number;
  /**
   * Название изотопа
   * @example "Уран-235"
   */
  name: string;
  /**
   * Описание; null, если не задано
   * @example "Описание изотопа"
   */
  description: string | null;
  /**
   * Ключ изображения в MinIO
   * @example "isotopes/abc-123/image.png"
   */
  imageUrl: string | null;
  /**
   * Ключ видео в MinIO
   * @example "isotopes/abc-123/video.mp4"
   */
  videoUrl: string | null;
  /**
   * Период полураспада в наносекундах (bigint как строка)
   * @example "703800000000000000"
   */
  halfLife: string | null;
  /**
   * Отформатированный период полураспада
   * @example "700 млн лет"
   */
  halfLifeFormatted: string;
  /**
   * Является ли альфа-излучателем
   * @example false
   */
  isAlpha: boolean | null;
  /**
   * Количество лайков
   * @example 12
   */
  likeCount: number;
  /**
   * Поставил ли лайк текущий пользователь
   * @example true
   */
  isLiked: boolean;
  /**
   * Является ли текущий пользователь автором
   * @example false
   */
  isAuthor: boolean;
}

export interface FetchIsotopesResponse {
  isotopes: IsotopeView[];
  /**
   * Применённый фильтр; -1, если фильтр не задан
   * @example 20
   */
  maxHalfLifeExponent: number;
}

export interface IsotopePublishDTO {
  /**
   * Период полураспада в наносекундах (положительное целое)
   * @example "31556952000000000000"
   */
  halfLife: string;
  /**
   * Является ли альфа-излучателем
   * @example false
   */
  isAlpha: boolean;
  /**
   * Описание изотопа
   * @example "Описание изотопа"
   */
  description: string;
}

export interface LikeResult {
  /**
   * Состояние лайка после операции
   * @example true
   */
  isLiked: boolean;
  /**
   * Количество лайков после операции
   * @example 13
   */
  likeCount: number;
}

export interface RegisterDTO {
  /**
   * Логин пользователя
   * @example "ivan"
   */
  login: string;
  /**
   * Пароль
   * @example "secret123"
   */
  password: string;
}

export interface LoginResponse {
  /**
   * Id пользователя
   * @example "1"
   */
  userId: number;
}

export interface LoginDTO {
  /**
   * Логин пользователя
   * @example "ivan"
   */
  login: string;
  /**
   * Пароль
   * @example "secret123"
   */
  password: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Isotopes API
 * @version 1.0.0
 * @contact
 *
 * Бэкенд SPA для работы с изотопами: аутентификация, черновики, публикации, лента и лайки
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags isotopes
     * @name IsotopeControllerFetchPublished
     * @summary Получить список опубликованных изотопов
     * @request GET:/api/isotopes
     */
    isotopeControllerFetchPublished: (
      query?: {
        /**
         * Максимальный период полураспада как 10^N наносекунд. Если не задан - без фильтра.
         * @example 20
         */
        maxHalfLifeExponent?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FetchIsotopesResponse, any>({
        path: `/api/isotopes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags isotopes
     * @name IsotopeControllerCreateDraft
     * @summary Создать черновик изотопа с изображением и видео
     * @request POST:/api/isotopes
     * @secure
     */
    isotopeControllerCreateDraft: (
      data: {
        /** @example "Уран-235" */
        name: string;
        /** @format binary */
        video?: File;
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<IsotopeView, void>({
        path: `/api/isotopes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags isotopes
     * @name IsotopeControllerFetchDraft
     * @summary Получить черновик текущего пользователя
     * @request GET:/api/isotopes/draft
     * @secure
     */
    isotopeControllerFetchDraft: (params: RequestParams = {}) =>
      this.request<IsotopeView, void>({
        path: `/api/isotopes/draft`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags isotopes
     * @name IsotopeControllerPublishDraft
     * @summary Опубликовать черновик
     * @request PUT:/api/isotopes/draft
     * @secure
     */
    isotopeControllerPublishDraft: (
      data: IsotopePublishDTO,
      params: RequestParams = {},
    ) =>
      this.request<IsotopeView, void>({
        path: `/api/isotopes/draft`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags isotopes
     * @name IsotopeControllerFetchById
     * @summary Получить изотоп по id или следующий в ленте
     * @request GET:/api/isotopes/{id}
     */
    isotopeControllerFetchById: (
      id: number,
      query?: {
        /** Если true - вернуть следующий опубликованный изотоп после id с циклическим переходом к первому */
        next?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<IsotopeView, void>({
        path: `/api/isotopes/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags isotopes
     * @name IsotopeControllerDeletePublished
     * @summary Удалить опубликованный изотоп
     * @request DELETE:/api/isotopes/{id}
     * @secure
     */
    isotopeControllerDeletePublished: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<IsotopeView, void>({
        path: `/api/isotopes/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags isotopes
     * @name IsotopeControllerSetLike
     * @summary Поставить или убрать лайк
     * @request POST:/api/isotopes/{id}/like/{action}
     * @secure
     */
    isotopeControllerSetLike: (
      id: number,
      action: LikeAction,
      params: RequestParams = {},
    ) =>
      this.request<LikeResult, void>({
        path: `/api/isotopes/${id}/like/${action}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRegister
     * @summary Регистрация пользователя
     * @request POST:/api/auth
     */
    authControllerRegister: (data: RegisterDTO, params: RequestParams = {}) =>
      this.request<LoginResponse, void>({
        path: `/api/auth`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @summary Вход по логину и паролю
     * @request POST:/api/auth/login
     */
    authControllerLogin: (data: LoginDTO, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogout
     * @summary Выход из системы
     * @request POST:/api/auth/logout
     * @secure
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
}
