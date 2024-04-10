SELECT
    ps.id,
    ps.order_id,
    ps.created_at,
    ps.order_fulfillment_order_id,
    count(psi.id) as "count_of_pre_order_items",
    psd.printed_at,
    psd.inspected_at,
    psd.packed_at,
    psd.shipped_at,
    psd.delivered_at,
    psd.returned_at,
    psd.cancelled_at,
    psd.refunded_at,
    psd.held_at,
    psd.confirmed_at,
    psd.held_reason,
    CASE
        WHEN (
            psd.printed_at IS NULL
            AND psd.inspected_at IS NULL
            AND psd.shipped_at IS NULL
            AND psd.held_at IS NULL
        ) THEN 'not printed'
        WHEN (
            psd.printed_at IS NOT NULL
            AND psd.inspected_at IS NULL
            AND psd.shipped_at IS NULL
            AND psd.held_at IS NULL
        ) THEN 'printed'
        WHEN (psd.held_at IS NOT NULL) THEN 'held'
        ELSE NULL
    END as "picking_slip_status"
FROM
    (
        SELECT
            ps.id,
            ps.order_id,
            ps.created_at,
            ps.order_fulfillment_order_id
        FROM
            picking_slips ps
    ) as ps
    LEFT OUTER JOIN picking_slip_dates psd on ps.id = psd.picking_slip_id
    INNER JOIN picking_slip_items psi on ps.id = psi.picking_slip_id
WHERE
    { whereStatement }
GROUP BY
    ps.id,
    ps.order_id,
    ps.created_at,
    ps.order_fulfillment_order_id,
    psd.printed_at,
    psd.inspected_at,
    psd.packed_at,
    psd.shipped_at,
    psd.delivered_at,
    psd.returned_at,
    psd.cancelled_at,
    psd.refunded_at,
    psd.held_at,
    psd.confirmed_at,
    psd.held_reason
HAVING
    picking_slip_status in ({ status })
ORDER BY
    ps.{ orderBy } { order }
LIMIT
    { perPage } OFFSET { page }