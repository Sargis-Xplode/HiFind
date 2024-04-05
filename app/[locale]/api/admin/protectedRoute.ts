import { NextApiRequest, NextApiResponse } from "next";
import { requireAdminAuth } from "../../middleware/auth";

// Example protected route that requires admin authentication
export default requireAdminAuth(async (req: NextApiRequest, res: NextApiResponse) => {
    // If the execution reaches here, it means the admin is authenticated
    res.status(200).json({ message: "Admin authenticated", adminId: req.adminId });
});
