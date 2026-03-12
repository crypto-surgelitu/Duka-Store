/**
 * @file models/types.js
 * Defines data shape constants used across the application (MVC - Model layer).
 */

export const USER_ROLES = {
    CUSTOMER: "customer",
    VENDOR: "vendor",
    ADMIN: "admin",
};

export const ORDER_STATUS = {
    PENDING: "pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
};

export const PRODUCT_STATUS = {
    ACTIVE: "active",
    DRAFT: "draft",
    OUT_OF_STOCK: "out_of_stock",
};
