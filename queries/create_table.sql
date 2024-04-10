-- PICKING_SLIP
CREATE TABLE IF NOT EXISTS `picking_slips` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) NOT NULL,
  `order_fulfillment_order_id` bigint(20) DEFAULT NULL,
  `is_contained_single_product` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `order_id`)
);

-- PICKING_SLIP_ITEMS
CREATE TABLE IF NOT EXISTS`picking_slip_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `picking_slip_id` bigint(20) NOT NULL,
  `item_id` bigint(20) NOT NULL,
  `stock_id` bigint(20) NOT NULL,
  `order_fulfillment_product_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `refunded_quantity` int(11) DEFAULT NULL,
  `location_id` bigint(20) DEFAULT NULL,
  `location_code` varchar(30) DEFAULT NULL,
  `is_pre_order` tinyint(1) DEFAULT NULL,
  `is_sales_only` tinyint(1) DEFAULT NULL,
  `pre_order_shipping_at` timestamp NULL DEFAULT NULL,
  `pre_order_deadline_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`item_id`,`picking_slip_id`,`order_fulfillment_product_id`,`stock_id`),
  KEY `FK_picking_slips_id` (`picking_slip_id`),
  CONSTRAINT `FK_picking_slips_id` FOREIGN KEY (`picking_slip_id`) REFERENCES `picking_slips` (`id`)
);

-- PICKING_SLIP_DATES
CREATE TABLE IF NOT EXISTS `picking_slip_dates` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `picking_slip_id` bigint(20) NOT NULL UNIQUE,
  `printed_username` varchar(20) DEFAULT NULL,
  `inspected_username` varchar(20) DEFAULT NULL,
  `packed_username` varchar(20) DEFAULT NULL,
  `shipped_username` varchar(20) DEFAULT NULL,
  `held_username` varchar(20) DEFAULT NULL,
  `cancelled_username` varchar(20) DEFAULT NULL,
  `refunded_username` varchar(20) DEFAULT NULL,
  `confirmed_username` varchar(20) DEFAULT NULL,
  `printed_at` timestamp NULL DEFAULT NULL,
  `inspected_at` timestamp NULL DEFAULT NULL,
  `packed_at` timestamp NULL DEFAULT NULL,
  `shipped_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `returned_at` timestamp NULL DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `refunded_at` timestamp NULL DEFAULT NULL,
  `held_at` timestamp NULL DEFAULT NULL,
  `confirmed_at` timestamp NULL DEFAULT NULL,
  `held_reason` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`picking_slip_id`),
  KEY `FK_picking_slip_id` (`picking_slip_id`),
  CONSTRAINT `FK_picking_slip_id` FOREIGN KEY (`picking_slip_id`) REFERENCES `picking_slips` (`id`)
);